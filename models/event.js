module.exports = (sequelize, Sequelize) => {
    const Event = sequelize.define("event", {
      Name: {
        type: Sequelize.STRING
      },
      Date: {
        type: Sequelize.DATE
      },
      Description: {
        type: Sequelize.STRING
      },
    
    }, { timestamps: false });
  
    return Event;
  };