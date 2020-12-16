require("dotenv").config();

CONFIG = {};

CONFIG.app = process.env.APP || "development";
CONFIG.port = process.env.PORT || "3000";

CONFIG.DB_URI = process.env.DB_URI;

CONFIG.jwt_encryption = process.env.JWT_ENCRYPTION || "akinoSecret";
CONFIG.jwt_expiration = process.env.JWT_EXPIRATION || "10000";