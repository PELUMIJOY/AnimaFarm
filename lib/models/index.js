"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sequelize_1 = require("sequelize");
const basename = path_1.default.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(path_1.default.join(__dirname, "../config/config.json"))[env];
const db = {};
let sequelize;
console.log('====================================');
console.log(config.use_env_variabl);
console.log('====================================');
// if (config.use_env_variable) {
// 	sequelize = new Sequelize.Sequelize(
// 		process.env[config.use_env_variable] as string,
// 		config
// 	);
// } else {
// 	sequelize = new Sequelize.Sequelize(
// 		config.database,
// 		config.username,
// 		config.password,
// 		config,
// 	);
// }
sequelize = new sequelize_1.Sequelize({
    host: "https://animafarm.onrender.com",
    dialect: "sqlite",
    storage: "./database.sqlite3"
});
fs_1.default.readdirSync(__dirname)
    .filter((file) => {
    return (file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js");
})
    .forEach((file) => {
    const model = require(path_1.default.join(__dirname, file))(sequelize, sequelize_1.DataTypes);
    db[model.name] = model;
});
Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
// db.sequelize = sequelize;
db.Sequelize = sequelize_1.Sequelize;
exports.default = db;
