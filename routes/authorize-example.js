const { authJwt } = require("../middleware");
const controller = require("../controllers/test-access");

module.exports = function(app) {
  var router = require("express").Router();

  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  router.get("/all", controller.allAccess);

  router.get(
    "/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  router.get(
    "/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.use('/api/test', router);
};