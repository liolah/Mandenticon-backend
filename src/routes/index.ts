import { Router } from "express";
import { generateRawMandala, generateMandalaImage } from "../controllers/indexController";
import { test1 } from '../services/test';
const router = Router();

router.get("/raw/:data", generateRawMandala);
router.get("/raw", generateRawMandala);
router.get("/api/:data", generateMandalaImage);
router.get("/api", generateMandalaImage);
router.get("/test", test1);

export default router;
