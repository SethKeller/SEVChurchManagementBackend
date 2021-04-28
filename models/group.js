module.exports = (sequelize, Sequelize) => {
    const Group = sequelize.define("groups", {
      Name: {
        type: Sequelize.STRING
      },
      Type: {
        type: Sequelize.STRING
      },


    
    }, { timestamps: false });
  
    return Group;
  };