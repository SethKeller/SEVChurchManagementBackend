module.exports = (sequelize, Sequelize) => {
    const GroupPerson = sequelize.define("groupPersons", {
      Leader: {
        type: Sequelize.STRING
      },
    

    
    }, { timestamps: false });
  
    return GroupPerson;
  };