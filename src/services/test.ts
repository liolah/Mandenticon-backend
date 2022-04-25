import {
  testLayerArtwork,
  testCenterArtwork,
  testLinearGradient,
  testRadialGradient,
  testCenterPiece,
  testLayer,
  testSingleLayerMandala,
  testDoubleLayerMandala
} from "../tests/objects/testObjects";
import { hash } from ".//hashService";
import { createMandala } from ".//mandalaService";
import {
  isValidRequestParameters,
  processImage,
} from ".//imageProcessing";
import svgRasterizer from ".//svgRasterizationService";
import artworksCollection from "../assets/Artworks.json";
import { Request, Response } from "express";

export const test1 = (req: Request, res: Response) => { 
  console.log(testCenterPiece.generatePatternSVGCode());
  // console.log(testLayer.generatePatternSVGCode());
  res.send("test");
}

