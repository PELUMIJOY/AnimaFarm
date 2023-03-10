const dotenv = require("dotenv")
dotenv.config();

export default {
    FILE_HOST:
    process.env.NODE_ENV === "development"
         ? "http://localhost:3120"
         : process.env.PRODUCTION_URL
}