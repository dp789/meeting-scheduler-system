const rTracer = require("cls-rtracer");
const { createLogger, format, transports } = require("winston");
const { camelCase } = require("lodash");

const { combine, timestamp, printf } = format;

const stringifyWithCheck = (message) => {
  if (!message) {
    return "";
  }
  try {
    return JSON.stringify(message);
  } catch (err) {
    if (message.data) {
      return stringifyWithCheck(message.data);
    } else {
      console.log(message);
      return `unable to unfurl message: ${message}`;
    }
  }
};

const logger = () => {
  const rTracerFormat = printf((info) => {
    const rid = rTracer.id();
    const infoSplat = info[Symbol.for("splat")] || [];

    let message = `${info.timestamp}: ${stringifyWithCheck(
      info.message
    )} ${stringifyWithCheck(...infoSplat)}`;
    if (rid) {
      message = `[request-id:${rid}]: ${message}`;
    }
    return message;
  });
  return createLogger({
    format: combine(timestamp(), rTracerFormat),
    transports: [new transports.Console()],
  });
};

/**
 * @description a utility method that takes in the object and parses the keys accordingly to the function provided
 * Mostly used for mapping the snake_case keys of a request payload and convert into camelCase
 * @param {Object} `the object / payload
 * @param {fn} function to be passed on the object
 * @returns the object after processsing the function
 */

const mapKeysDeep = (obj, fn) =>
  Array.isArray(obj)
    ? obj.map((val) => mapKeysDeep(val, fn))
    : typeof obj === "object"
    ? Object.keys(obj).reduce((acc, current) => {
        const key = fn(current);
        const val = obj[current];
        acc[key] =
          val !== null && typeof val === "object" ? mapKeysDeep(val, fn) : val;
        return acc;
      }, {})
    : obj;

/**
 * @description a utility method that takes in the object and parses the keys accordingly to convert into camelCase
 * @param {Object} `the object / payload
 * @returns the object's keys converted into camelCase
 */

const transformToCamelCase = (payload) =>
  mapKeysDeep(payload, (keys) => camelCase(keys));

module.exports = { logger, transformToCamelCase };
