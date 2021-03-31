module.exports = (sequelize, Sequelize) => {
    const Skill = sequelize.define("skill", {
      SkillID:{
        type :Sequelize.INTEGER(11)
      },
      SkillName: {
        type: Sequelize.STRING
      }
    }, { timestamps: false });
  
    return Skill;
  };