import express from 'express';
//import { login, register, updateProfile,logout} from '../controllers/user.controller.js';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
import { registerCompany, getCompany, getCompanybyId, updateCompany } from '../controllers/company.controller.js';
const router = express.Router();

router.route("/register").post(isAuthenticated,registerCompany);
router.route("/get").get(isAuthenticated,getCompany);
router.route("/get/:id").get(isAuthenticated,getCompanybyId);
router.route("/update/:id").put(isAuthenticated,updateCompany);

export default router;

