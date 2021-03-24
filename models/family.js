module.exports = (sequelize, Sequelize) => {
    const Family = sequelize.define("family", {
      FamilyName: {
        type: Sequelize.STRING
      },
      Picture: {
        type: Sequelize.STRING
      }
    
    }, { timestamps: false });
  
    return Family;
  };