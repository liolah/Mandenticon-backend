import { Router } from "express";
import { generateRawMandala, generateMandalaImage } from "../controllers/indexController";
import { test} from '../services/svgToJpgConversionService'
const router = Router();

router.get("/raw/:data", generateRawMandala);
router.get("/api/:data", generateMandalaImage);
router.get("/test", test);

export default router;
