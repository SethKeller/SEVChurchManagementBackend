module.exports = (sequelize, Sequelize) => {
    const Congregation = sequelize.define("congregation", {
      Name: {
        type: Sequelize.STRING
      },
      City: {
        type: Sequelize.STRING
      },
      State: {
        type: Sequelize.STRING
      },
      Zipcode: {
        type: Sequelize.STRING
      },
      StreetAddress:{
        type: Sequelize.STRING
      },
      MailingAddress:{
        type: Sequelize.STRING
      },
      Phone: {
        type: Sequelize.STRING
      }
    },{ timestamps: false });
  
    return Congregation;
  };