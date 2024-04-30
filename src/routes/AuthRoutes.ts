import { LoginGenerateToken } from "../auth/LoginGenerateToken"
import { logout } from "../auth/Logout"
import router from "./UserRoutes"

router.post('/login/', LoginGenerateToken)

router.post('/logout/', logout)

export default router