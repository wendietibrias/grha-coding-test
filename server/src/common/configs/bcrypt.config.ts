import { registerAs } from "@nestjs/config";

export default registerAs('bcrypt' , () => ({
     salt: Number(process.env.BCRYPT_SALT_ROUND) || 10
}));