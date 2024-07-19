import { UserRepository } from "../repository";


export async function VerifyIfUSerAlreadyExist(): Promise<number> {
    const userRepo = UserRepository()

    const numberOfUser = await userRepo.count()

    return numberOfUser    
}