module.exports = (sequelize, Sequelize) => {
    const HeadOfFamily = sequelize.define("family", {
      FamilyName: {
        type: Sequelize.STRING
      },
      Picture: {
        type: Sequelize.STRING
      },
      Address:{
          type: Sequelize.STRING
      }
    
    }, { timestamps: false });
  
    return Family;
  };