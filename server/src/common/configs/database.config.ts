import { registerAs } from "@nestjs/config";

export default registerAs('database' , () => ({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USERNAME || "root",
      password: process.env.DB_PASSWORD || "",
      dbName: process.env.DB_NAME || "library"
}));