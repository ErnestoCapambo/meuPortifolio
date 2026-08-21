import { CreateMainTitleSeeder } from "./CreateMainTitleSeeder";
import { CreateUserSeeder } from "./CreateUserSeeder";

const userSeed = new CreateUserSeeder()
const mainTitleSeed = new CreateMainTitleSeeder()

async function runSeeds (): Promise<void> {
    try {
        await userSeed.execute()
        await mainTitleSeed.execute()
        console.log("Seeds completed successfully")
    } catch (error) {
        console.error("Seed failed:", error)
    }
}

runSeeds()
