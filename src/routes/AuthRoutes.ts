import { LoginGenerateToken } from "../auth/LoginGenerateToken"
import router from "./UserRoutes"

router.post('/login/', LoginGenerateToken)

export default router