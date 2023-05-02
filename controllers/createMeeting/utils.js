const {
  findEventsForRoom,
  findEventsForAttendies,
} = require("../../db/daos/events");

/**
 * Check if a room is available during a specified time slot.
 *
 * @param {number} roomId - The ID of the room to check.
 * @param {string} date - The date of the time slot in YYYY-MM-DD format.
 * @param {string} startTime - The start time of the time slot in hh:mm:ss format.
 * @param {string} endTime - The end time of the time slot in hh:mm:ss format.
 * @returns {Promise<boolean>} - A Promise that resolves to a boolean value indicating whether the room is available.
 */
async function checkRoomAvailability(roomId, date, startTime, endTime) {
  const events = await findEventsForRoom({
    roomId,
    startTime,
    endTime,
    date,
  });

  return events.length === 0;
}

/**
 * Check if any attendee is not available during a specified time slot.
 *
 * @param {string} date - The date of the time slot in YYYY-MM-DD format.
 * @param {string} startTime - The start time of the time slot in hh:mm:ss format.
 * @param {string} endTime - The end time of the time slot in hh:mm:ss format.
 * @param {string} attendees - A comma-separated list of attendee names.
 * @returns {Promise<string[]>} - A Promise that resolves to an array of unavailable attendee names.
 */
async function checkAttendeeAvailability(attendees, startTime, endTime, date) {
  const attendeeList = attendees.split(",").map((attendee) => attendee.trim());
  const unavailableAttendees = [];

  for (const attendee of attendeeList) {
    const events = await findEventsForAttendies({
      attendee,
      startTime,
      endTime,
      date,
    });

    if (events.length > 0) {
      unavailableAttendees.push(attendee);
    }
  }

  return unavailableAttendees;
}

module.exports = { checkRoomAvailability, checkAttendeeAvailability };
