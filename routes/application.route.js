import express from 'express';

import { isAuthenticated } from '../middlewares/isAuthenticated.js';
import { applyJob,getAppliedJobs,getApplications,updateStatus } from '../controllers/application.controller.js';
const router = express.Router();

router.route("/applyJob").post(isAuthenticated,applyJob);
router.route("/getAppliedJobs").get(isAuthenticated, getAppliedJobs);
router.route("/getApplications").get(isAuthenticated,getApplications);
router.route("/updateStatus/:id").get(isAuthenticated,updateStatus);


export default router;

