function getAttributes(sequelize, DataTypes) {
  return {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    date: {
      allowNull: false,
      type: DataTypes.DATEONLY,
    },
    start_time: {
      allowNull: true,
      type: DataTypes.TIME,
    },
    end_time: {
      allowNull: true,
      type: DataTypes.TIME,
    },
    room_id: {
      allowNull: false,
      type: DataTypes.STRING(2),
    },
    attendees: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    createdAt: {
      field: "createdAt",
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: sequelize.fn("now"),
    },
    updatedAt: {
      field: "updatedAt",
      allowNull: true,
      type: DataTypes.DATE,
    },
  };
}

function model(sequelize, DataTypes) {
  const events = sequelize.define(
    "events",
    getAttributes(sequelize, DataTypes),
    {
      tableName: "events",
      timestamps: true,
    }
  );

  return events;
}

module.exports = { model, getAttributes };
