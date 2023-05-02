module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .addColumn("users", "calender_id", {
        allowNull: true,
        type: Sequelize.INTEGER,
      })
      .then(() =>
        queryInterface.addConstraint("users", {
          type: "FOREIGN KEY",
          fields: ["calender_id"],
          name: "use_calender_id_fk",
          references: {
            table: "calender_event",
            field: "id",
          },
        })
      );
  },
  async down(queryInterface) {
    await queryInterface.dropTable("Users");
  },
};
