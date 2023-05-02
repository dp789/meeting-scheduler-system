const { createEvents } = require("../../db/daos/events");
const { checkRoomAvailability, checkAttendeeAvailability } = require("./utils");
const { transformToCamelCase, logger } = require("../../utils/index");
const { apiSuccess, apiFailure } = require("../../utils/apiUtils");

exports.createMeet = async (req, res, next) => {
  try {
    const reqBody = transformToCamelCase(req.body);
    logger().info({ reqBody });

    const { date, startTime, endTime, roomId, attendees } = reqBody;

    const isRoomAvailable = await checkRoomAvailability(
      roomId,
      date,
      startTime,
      endTime
    );

    if (!isRoomAvailable) {
      return apiFailure(
        res,
        400,
        "The room is not available during the specified time slot."
      );
    }

    const unavailableAttendees = await checkAttendeeAvailability(
      attendees,
      startTime,
      endTime,
      date
    );

    if (unavailableAttendees.length > 0) {
      return apiFailure(
        res,
        400,
        `The following attendees are not available during the specified time slot: ${unavailableAttendees.join(
          ", "
        )}`
      );
    }

    const events = await createEvents({
      date,
      startTime,
      endTime,
      roomId,
      attendees,
    });

    return apiSuccess(
      res,
      `Meeting scheduled successfully for attendees: ${events?.dataValues.attendees}`
    );
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
