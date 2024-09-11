import mysql from "mysql2/promise";

export const connectToDB = async () => {
  try {
    const conn = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "Password",
      database: "employee_db",
    });
    console.log("Successfully connected to the mysql database");
    return conn;
  } catch (error) {
    console.error("Error connecting to the mysql database: ", error.message);
  }
};
