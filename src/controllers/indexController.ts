import { Request, Response } from "express";
import { createMandala } from "../services/mandalaService";
import { processImage } from "../services/imageProcessing";
import path from "path";
import fs from "fs";

const generateRawMandala = (req: Request, res: Response) => {
  const data = req.params.data || "Hesham";
  const mandala = createMandala(data);
  res.send(mandala);
};

const generateMandalaImage = async (req: Request, res: Response) => {
  try {
    fs.rmSync(path.resolve('temp'), { recursive: true, force: true });
    await processImage(
      req.query.width as unknown as number,
      req.query.height as unknown as number,
      req.query.format as unknown as string,
      req.query.greyScale as unknown as string,
      req.query.tint as unknown as string,
      req.params.data || "Hesham"
    );
    res.sendFile(
      path.resolve(
        "temp",
        `temp.${(req.query.format as unknown as string) || "png"}`
      )
    );
  } catch (error) {
    res.status(400).send(error);
  }
};

export { generateRawMandala, generateMandalaImage };
