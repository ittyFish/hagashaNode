import { login,addUser,getAllUsers} from "../Controllers/user.js";
import  express  from "express";
import { auth, authAdmin } from "../Middlewares/auth.js";

const router= express.Router();

router.post('/',addUser);
router.post('/login',login);
router.get('/',authAdmin,getAllUsers);

export default router;

