// Database configuration information
module.exports = {
    HOST: "t4-database.cwre8cvv6tyn.us-west-1.rds.amazonaws.com",
    USER: "admin",
    PASSWORD: "passwordt4",
    DB: "congregationdb",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
};
