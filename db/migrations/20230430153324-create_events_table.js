module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("events", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      date: {
        allowNull: false,
        type: Sequelize.DATEONLY,
      },
      start_time: {
        allowNull: true,
        type: Sequelize.TIME,
      },
      end_time: {
        allowNull: true,
        type: Sequelize.TIME,
      },
      room_id: {
        allowNull: false,
        type: Sequelize.STRING(2),
      },
      attendees: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("Events");
  },
};
