module.exports = (sequelize, Sequelize) => {
    const Person_Skills = sequelize.define("person_skill", {
      PersonId: {
        type :Sequelize.INTEGER(11)
      },
      SkillId:{
          type :Sequelize.INTEGER(11)
      }
    
    }, { timestamps: false });
  
    return Person_Skills;
  };