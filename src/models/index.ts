import fs from "fs";
import path, { dirname } from "path";


import { DataTypes, Sequelize } from "sequelize";

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(path.join(__dirname,"../config/config.json"))[env];
const db: any = {};

let sequelize: any;
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

 sequelize = new Sequelize({
	host: "https://animafarm.onrender.com",
	dialect: "sqlite",
	storage:"./database.sqlite3"
});

fs.readdirSync(__dirname)
	.filter((file: string) => {
		return (
			file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
		);
	})
	.forEach((file: string) => {
		const model = require(path.join(__dirname, file))(
			sequelize,
			DataTypes
		);
		db[model.name] = model;
	});

Object.keys(db).forEach((modelName: string) => {
	if (db[modelName].associate) {
		db[modelName].associate(db);
	}
});

// db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
