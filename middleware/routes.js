const error = require("../config/error");
const authRoutes = require("../apis/auth");
const userRoutes = require("../apis/user");
const employmentRoutes = require("../apis/employment");
const bankRoutes = require("../apis/bank");

module.exports = (app) => {
  app.use("/api/v1", authRoutes);
  app.use("/api/v1", userRoutes);
  app.use("/api/v1", employmentRoutes);
  app.use("/api/v1", bankRoutes);
  app.use(error);
}