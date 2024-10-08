import express from "express";
import { loginUser, addUser, getUser, editUser, getUserById, deleteUserById } from "../controllers/loginController.js";
import { verifyJWT } from "../middleWare/verifyToken.js";

const router = express.Router();

// router.post('/register', registerValidationRules, handleRegister);
router.post('/login',loginUser)

router.use(verifyJWT)
router.post('/addUser', addUser)
router.get('/getUser/:role', getUser)
router.post('/editUser', editUser)
router.get('/getUserById/:id', getUserById)
router.delete('/deleteUser/:id', deleteUserById)

export default router;