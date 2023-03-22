import {scrypt, randomBytes} from "crypto";
import {promisify} from 'util';

const scryptAsycnc = promisify(scrypt);

export class Password{
    static async toHash(password:string){
        const salt = randomBytes(8).toString('hex');
        const buf = (await scryptAsycnc(password, salt, 64)) as Buffer

        return `${buf.toString('hex')}.${salt}`;
    }

    static async compare(storedPassword: string, suppliedPassword: string){
         const [hashedPasswod, salt] = storedPassword.split('.');
         const buf = (await scryptAsycnc(suppliedPassword, salt, 64)) as Buffer

         return buf.toString('hex') === hashedPasswod;
    }
}