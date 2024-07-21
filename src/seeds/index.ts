import { CreateMainTitleSeeder } from "./CreateMainTitleSeeder";
import { CreateUserSeeder } from "./CreateUserSeeder";

const userSeed = new CreateUserSeeder()
const mainTitleSeed = new CreateMainTitleSeeder()

async function runSeeds (): Promise<void> {
    await userSeed.execute()
    await mainTitleSeed.execute()

    return
}

runSeeds()
