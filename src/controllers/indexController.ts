import { Request, Response } from "express";
import { createMandala } from "../services/mandalaService";
import { processImage } from "../services/imageProcessing";

const generateRawMandala = (req: Request, res: Response) => {
  const data = req.params.data;
  const mandala = createMandala(data);
  res.send(mandala);
};

const generateMandalaImage = async (req: Request, res: Response) => {
  try {
    const image = processImage(
      req.query.width as unknown as number,
      req.query.height as unknown as number,
      req.query.format as unknown as string,
      req.query.greyScale as unknown as boolean,
      req.params.data
    );
    res.type(req.query.format as unknown as string || 'png').send(image);
  } catch (error) {
    res.status(400).send(error);
  }
};

export { generateRawMandala, generateMandalaImage };
