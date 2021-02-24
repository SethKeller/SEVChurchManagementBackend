module.exports = (sequelize, Sequelize) => {
  const Room = sequelize.define("room", {
    Name: {
      type: Sequelize.STRING
    },
    Number: {
      type: Sequelize.INTEGER(11)
    },
    // CongregationId: {
    //   type: DataTypes.INTEGER(11),
    //   allowNull: false
    // },
  }, { timestamps: false });

  return Room;
};