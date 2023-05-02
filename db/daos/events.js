const db = require("../models/index");
const { Sequelize } = require("sequelize");

const createEvents = async ({
  id,
  date,
  startTime,
  endTime,
  roomId,
  attendees,
}) =>
  db.events.create({
    id,
    date,
    start_time: startTime,
    end_time: endTime,
    room_id: roomId,
    attendees,
  });

const findEventsForRoom = async ({ roomId, startTime, endTime, date }) =>
  await db.events.findAll({
    where: {
      room_id: roomId,
      date,
      [Sequelize.Op.or]: [
        {
          start_time: {
            [Sequelize.Op.between]: [startTime, endTime],
          },
        },
        {
          end_time: {
            [Sequelize.Op.between]: [startTime, endTime],
          },
        },
      ],
    },
  });

const findEventsForAttendies = async ({ attendee, startTime, endTime, date }) =>
  await db.events.findAll({
    where: {
      attendees: {
        [Sequelize.Op.like]: `%${attendee}%`,
      },
      date: date,
      [Sequelize.Op.or]: [
        {
          start_time: {
            [Sequelize.Op.between]: [startTime, endTime],
          },
        },
        {
          end_time: {
            [Sequelize.Op.between]: [startTime, endTime],
          },
        },
      ],
    },
  });

module.exports = { createEvents, findEventsForRoom, findEventsForAttendies };
