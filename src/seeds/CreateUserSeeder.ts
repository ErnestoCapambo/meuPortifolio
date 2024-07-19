import "dotenv/config"
import bcrypt from "bcryptjs";
import { VerifyIfUSerAlreadyExist } from "../helpers/verifyIfUSerAlreadyExist";
import { CreateUserService } from "../Services/UserServices/CreateUserService";

export class CreateUserSeeder {

    async execute() {

        if(await VerifyIfUSerAlreadyExist() > 0) {
            return
        }
        
        console.log("============================== RODANDO AS USER SEEDS =============================")
        
        const username = "Ernesto Capambo";
        const email = "ernestosikilitacapambo@gmail.com"
        const contact = "957053820";
        const password = String(process.env.DEFAULT_USER_PASSWORD)
        const passwordHash = await bcrypt.hash(password, Number(process.env.HASH_SALT))


        const service = new CreateUserService()

        await service.execute({
            username: username,
            email: email,
            contact: contact,
            password: passwordHash
        })

        console.log("============================== SUCCESSUL USER SEEDS RUNNED ============================")

        return
    }
}
