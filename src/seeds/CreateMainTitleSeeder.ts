import { CreateMAinTitleService } from "../Services/MainTitleServices/CreateMAinTitleService";
import { GetUserService } from "../Services/UserServices/GetUserService";
import { verifyIfMainTitleAlreadyExists } from "../helpers/verifyIfMainTitleAlreadyExists";


export class CreateMainTitleSeeder {
    async execute(): Promise<any> {
        if (await verifyIfMainTitleAlreadyExists() > 0) {
            return            
        }

        console.log("============================== RODANDO AS MAIN TITLE SEEDS =============================")

        const user = new GetUserService()

        const userResult = await user.execute({})

        const maintitle = {
            title: "Criando soluções para o mercado moderno",
            description: "Primeiro titulo",
            user_id: String(userResult[0].id)
        }

        const mainTitleService = new CreateMAinTitleService()

        await mainTitleService.execute({ title: maintitle.title, description: maintitle.description, user_id: maintitle.user_id })

        return
    }
}