import {addOrder,getAllOrdres,getOrderById,deleteOrderById,updateOrder} from "../Controllers/order.js"
import  express from "express";
import { auth, authAdmin } from "../Middlewares/auth.js";

const router = express.Router();
router.get('/',authAdmin,getAllOrdres);
router.get('/:id', getOrderById);
router.delete('/:id', deleteOrderById);
router.put('/:id',authAdmin, updateOrder);
router.post('/',addOrder);

export default router;