import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
	host: "https://animafarm.onrender.com",
	dialect: "sqlite",
	storage:"./database.sqlite3"
});

const connection = async () => {
	try {
		await sequelize.authenticate();
		console.log("Connection has been made successfully");
		return true;
	} catch (error) {
		console.log("Unable to connect to the database", error);
	}
};

export { sequelize, connection };
