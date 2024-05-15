import express from "express"
import UserRoutes from "../routes/UserRoutes"
import AuthRoutes from "../routes/AuthRoutes"
import ProjectRoutes from "../routes/ProjectRoutes";
import MainTitleRoutes from "../routes/MainTitleRoutes";
import EspecialityRoutes from "../routes/EspecialityRoutes";
import AboutRoutes from "../routes/AboutRoutes";
import MensageRoutes from "../routes/MensageRoutes";
import { prisma } from "../lib/Prisma"
import cors from "cors";

const app = express()
app.use(express.json())

app.use(cors({
    origin: '*'
}))

app.use("/auth", AuthRoutes)

app.use("/users", UserRoutes)

app.use("/projects", ProjectRoutes)

app.use("/title", MainTitleRoutes)

app.use("/especiality", EspecialityRoutes)

app.use("/about", AboutRoutes)

app.use("/mensages", MensageRoutes)

const port = process.env.PORT
const defaultUuid = 'b62def04-c569-43e0-a195-74c33ae62dee'

app.listen(port ?? 1500, async() => {
    const verifyUser = await prisma.user.count()
    if (verifyUser == 0) {
        const defaultUser = await prisma.user.create({
            data: {
                id: defaultUuid,
                username: 'Ernesto Capambo',
                email: 'ernesto@gmail.com',
                contact: '957053820',
                password: 'python.org777'
            }
        })
    }
    if (port !== undefined) {
        console.log(`Server running at port ${port}`) 
    } else {
        console.log("Server running at port 1500")
    }
})
