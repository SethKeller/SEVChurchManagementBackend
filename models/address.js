module.exports = (sequelize, Sequelize) => {
    const Address = sequelize.define("address", {
      City: {
        type: Sequelize.STRING
      },
      HouseNumber: {
        type: Sequelize.STRING
      },
      Street: {
        type: Sequelize.STRING
      },
      State: {
        type: Sequelize.STRING
      },
      Zipcode: {
        type: Sequelize.STRING
      },
      Active: {
        type: Sequelize.INTEGER(11)
     },
    
    }, { timestamps: false });
  
    return Address;
  };