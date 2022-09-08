import { Sequelize } from "sequelize";

const sequelize = new Sequelize("travel_book", "root", null, {
  host: "localhost",
  dialect: "mysql",
});

const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log(
      " ✅ Connection to database has been established successfully."
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default connection;
