import mongoose from "mongoose";
import { Order } from "../Models/order.js";
import { User } from "../Models/users.js";
import jwt from "jsonwebtoken";


const getAllOrdres = async (req, res) => {
    try {
        let allOrders = await Order.find()
        res.json(allOrders)
    }
    catch (err) {
        res.status(400).json({ type: "error", message: "cannot bring all orders" })
    }
}

const getOrderById = async (req, res) => {
    try {
        let ordenerID = req.body;
        const allOrder = await Order.findById(ordenerID);
        if (!allOrder)
            return res.status(400).json({ type: "id not find error", message: "no orders for this user" });
        return res.json(allOrder)
    }
    catch (err) {
        res.status(400).json({ type: "error", message: err.message })
    }
}

const addOrder = async (req, res) => {
    try {
        let { ordDate, toDate, address, userCode, orderedProducts, isExit } = req.body;
        if (!userCode || !address)
            return res.status(400).json({ type: "miisied perams", message: "address or user code --!push it" })


        let sameProduct = await Order.findOne({ address, userCode });
        if (sameProduct)
            return res.status(400).json({ type: "same order", message: "same details" })

        let newOrrd = await Order.create({ ordDate, toDate, address, userCode, orderedProducts, isExit })
        res.json(newOrrd)
    }
    catch (err) {
        res.status(400).json({ type: "error", message: err.message })
    }
}

const deleteOrderById = async (req, res) => {
    try {

        let token = req.headers["xxx-token"];
        if (!token)
            return res.status(401).json({ type: "not authorized", message: "user not authorized" })
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_STRING);
        }
        catch (err) {
            return res.status(401).json({ type: "not authorized", message: "user not authorized" })
        }
        let { id } = req.params;
        if (!mongoose.isValidObjectId(id))
            return res.status(400).json({ type: "id error", message: "order id is not valid " });
        const ord = await Order.findById(id);
        if (!ord)
            return res.status(404).json({ type: "did not order to delete", message: " not order find" });
        let userIdCode = ord.userCode;
        let tokenId = decoded._id;
        let deleted;
        let user = await User.findById(tokenId)
        if ((user.role == "admin" || tokenId == userIdCode) && (!ord.isExit))
            deleted = await Order.findByIdAndDelete(id);
        res.json(deleted);
    } catch (err) {
        res.status(400).json({ type: "error", message: err.message })
    }
}

const updateOrder = async (req, res) => {
    try {
        let token = req.headers["xxx-token"];
        if (!token)
            return res.status(401).json({ type: "not authorized", message: "user not authorized" })
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_STRING);
        }
        catch (err) {
            return res.status(401).json({ type: "not authorized", message: "user not authorized" })
        }
        let tokenId = decoded._id;
        let { id } = req.params;
        if (!mongoose.isValidObjectId(id))
            return res.status(400).json({ type: "id error", message: "order id is not valid " });
        let order = await Order.findById(id);
        if (!order)
            return res.status(404).json({ type: "did not order update to delete", message: " not order find" });
        let user = await User.findById(tokenId);
        if (!user)
            return res.status(404).json({ type: "did not user to delete", message: " not user find" });
        if (user.role == "admin" && order.isExit == false) {
            order.isExit = true;
            let update = await Order.findByIdAndUpdate(id, order, { new: true });
            res.json(update);
        }
    }
    catch (err) {
        res.status(400).json({ type: "error", message: err.message })
    }
}


export { addOrder, getAllOrdres, getOrderById, deleteOrderById, updateOrder }