import { Router } from "express";
import { generateRawMandala, generateMandalaImage } from "../controllers/indexController";
const router = Router();

router.get("/raw/:data", generateRawMandala);
router.get("/raw", generateRawMandala);
router.get("/api/:data", generateMandalaImage);
router.get("/api", generateMandalaImage);

export default router;
