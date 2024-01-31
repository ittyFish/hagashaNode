import {addProduct,getAllProducts,getProductById,deleteProductById,updateProduct} from "../Controllers/product.js"
import  express from "express";
import { auth, authAdmin } from "../Middlewares/auth.js";

const router = express.Router();
router.get('/',getAllProducts);
router.get('/:id', getProductById);
router.delete('/:id',authAdmin, deleteProductById);
router.put('/:id',authAdmin, updateProduct);
router.post('/',authAdmin,addProduct);

export default router;