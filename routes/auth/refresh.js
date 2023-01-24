const express = require("express");
const router = express.Router();
const refreshTokenController = require("../../controllers/auth/refreshController");

router.get("/", refreshTokenController.handleRefreshToken);

module.exports = router;
