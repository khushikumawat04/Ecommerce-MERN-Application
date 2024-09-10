import { pbkdf2Sync, randomBytes, timingSafeEqual } from "crypto";

export const hashPassword = async (password) => {
    try {
        const salt = randomBytes(16).toString("hex");
        const hashedpassword = pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);
        return `${salt}:${hashedpassword}`;
    } catch (error) {
        console.log(error);
    }
}

export const comparepassword = async (password, hashedpassword) => {
    try {
        const [salt, key] = hashedpassword.split(":");
        const hashedBuffer = pbkdf2Sync(password, salt, 1000, 64, `sha512`);
        const keyBuffer = Buffer.from(key, "hex");
        const match = timingSafeEqual(hashedBuffer, keyBuffer);
        return match;
    } catch (error) {
        console.log(error);
    }
}
