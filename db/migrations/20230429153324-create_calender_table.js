module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("calender_event", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      calender_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      event_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("CalenderEvent");
  },
};
