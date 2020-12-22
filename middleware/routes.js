const error = require("../config/error");
const authRoutes = require("../apis/auth");
const userRoutes = require("../apis/user");

module.exports = (app) => {
  app.use("/api/v1", authRoutes);
  app.use("/api/v1", userRoutes);
  app.use(error);
}