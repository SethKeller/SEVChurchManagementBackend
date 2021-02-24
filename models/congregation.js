module.exports = (sequelize, Sequelize) => {
    const Congregation = sequelize.define("congregation", {
      Name: {
        type: Sequelize.STRING
      },
      Address: {
        type: Sequelize.STRING
      },
      Phone: {
        type: Sequelize.STRING
      }
    },{ timestamps: false });
  
    return Congregation;
  };