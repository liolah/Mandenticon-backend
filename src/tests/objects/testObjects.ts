import Artwork from "../../classes/artwork";
import Mandala from "../../classes/mandala";
import { CenterPiece, Layer } from "../../classes/pattern";
import { LinearGradient, RadialGradient } from "../../classes/Gradient";
import artworksCollection from "../../assets/Artworks.json";

// Instantiate all objects
const testLayerArtwork = new Artwork(
  artworksCollection["Layer patterns"][0]["initial scale"],
  artworksCollection["Layer patterns"][0]["height"],
  artworksCollection["Layer patterns"][0]["yPan"],
  artworksCollection["global xPan"],
  artworksCollection["Layer patterns"][0]["outline"],
  artworksCollection["Layer patterns"][0]["details"]
);
const testCenterArtwork = new Artwork(
  artworksCollection["Center patterns"][0]["initial scale"],
  artworksCollection["Center patterns"][0]["height"],
  artworksCollection["Center patterns"][0]["yPan"],
  artworksCollection["global xPan"],
  artworksCollection["Center patterns"][0]["outline"],
  artworksCollection["Center patterns"][0]["details"]
);

const testLinearGradient = new LinearGradient(120, "v", 50, 50);
const testRadialGradient = new RadialGradient(120, 240, 70, 50, 50);
const testCenterPiece = new CenterPiece(
  testCenterArtwork,
  "testCenterPiece",
  70,
  true,
  testRadialGradient
);
const testLayer = new Layer(
  testLayerArtwork,
  "testLayer",
  70,
  6,
  0,
  true,
  testLinearGradient
);

const testSingleLayerMandala = new Mandala(
  "9F86D081884C7D659A2FEAA0C55AD015A3BF4F1B2B0B822CD15D6C15B0F00A08",
  artworksCollection,
  false
);

const testDoubleLayerMandala = new Mandala(
  "9F86D081884C7D659A2FEAA0C55AD015A3BF4F1B2B0B822CD15D6C15B0F00A08",
  artworksCollection,
  true
);

const testCenterPieceSVGcode = `<symbol id="CenterPiece-testCenterPiece" viewBox="-429 -377 1000 1000"> <g id="`;

const testLayerSVGcode = `<symbol id="Layer-testLayer" viewBox="-429 -378 1000 1000"> <g id="_1_fill" data-name="1 fil`;

const singleLayerMandalaSVGcode = `<svg width="1000" height="1000"`;

const doubleLayerMandalaSVGcode = `<svg width="1000" height="1000" viewBox="0 0 1100 1100" xmlns="http://www.w3.org/2000/svg"> <defs><s`;

export {
  testLayerArtwork,
  testCenterArtwork,
  testLinearGradient,
  testRadialGradient,
  testCenterPiece,
  testLayer,
  testSingleLayerMandala,
  testDoubleLayerMandala,
  singleLayerMandalaSVGcode,
  doubleLayerMandalaSVGcode,
  testCenterPieceSVGcode,
  testLayerSVGcode,
};
