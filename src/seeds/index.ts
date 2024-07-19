import { CreateUserSeeder } from "./CreateUserSeeder";

const userSeed = new CreateUserSeeder()

async function runSeeds (): Promise<void> {
    await userSeed.execute()

    return
}

runSeeds()
