import { Router } from "express";
import { generateRawMandala, generateMandalaImage } from "../controllers/indexController";
const router = Router();

router.get("/raw/:data", generateRawMandala);
router.get("/api/:data", generateMandalaImage);

export default router;
