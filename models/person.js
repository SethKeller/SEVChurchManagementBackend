module.exports = (sequelize, Sequelize) => {
    const Person = sequelize.define("person", {
      FirstName: {
        type: Sequelize.STRING
      },
      LastName: {
        type: Sequelize.STRING
      },
      DisplayName: {
        type: Sequelize.STRING
      },
      Picture: {
          type: Sequelize.STRING
      },
      DateofBirth: {
        type: Sequelize.DATEONLY
      },
      Email: {
        type: Sequelize.STRING
      },
      Phone: {
        type: Sequelize.STRING
      },
      Password: {
        type: Sequelize.STRING
      },
      HousePhone: {
        type: Sequelize.STRING
      },
      FamilyRole:{
          type :Sequelize.INTEGER(11)
      }
    
    }, { timestamps: false });
  
    return Person;
  };