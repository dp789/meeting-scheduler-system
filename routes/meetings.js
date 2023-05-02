const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");

const { createMeet } = require("../controllers/createMeeting/index");

router.post(
  "/schedule-meeting",
  body("date").isDate("YYYY-MM-DD").withMessage("Invalid date format"),
  body("start_time")
    .matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
    .withMessage("Invalid start time format"),
  body("end_time")
    .matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/)
    .withMessage("Invalid end time format"),
  body("room_id")
    .isIn(["R1", "R2", "R3", "R4", "R5"])
    .withMessage("Invalid room ID"),
  body("attendees").isString().withMessage("Attendees must be an array"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  createMeet
);
module.exports = router;
