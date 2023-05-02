module.exports = {
  async up(queryInterface) {
    await queryInterface.addConstraint("calender_event", {
      type: "FOREIGN KEY",
      fields: ["event_id"],
      name: "event_id_fk",
      references: {
        table: "events",
        field: "id",
      },
    });
  },
};
