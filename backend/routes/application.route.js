import express from 'express';

import { isAuthenticated } from '../middlewares/isAuthenticated.js';
import { applyJob, getAppliedJobs, updateStatus, getApplicants } from '../controllers/application.controller.js';
const router = express.Router();

router.route("/apply/:id").get(isAuthenticated, applyJob);
router.route("/get").get(isAuthenticated, getAppliedJobs);
router.route("/:id/getApplications").get(isAuthenticated, getApplicants);
router.route("/updateStatus/:id").post(isAuthenticated, updateStatus);


export default router;

