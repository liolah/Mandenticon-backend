import {
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
} from "../objects/testObjects";
import { hash } from "../../services/hashService";
import { createMandala } from "../../services/mandalaService";
import {
  isValidRequestParameters,
  processImage,
} from "../../services/imageProcessing";
import svgRasterizer from "../../services/svgRasterizationService";
import artworksCollection from "../../assets/Artworks.json";

export default function () {
  describe("Check all Methods's expected output", () => {
    it('Method "decodeBase64" in class Artworks decodes base64 properly', () => {
      expect(testLayerArtwork.decodeBase64("dGVzdA==")).toEqual("test");
    });

    it('Method "generateGradientSVGCode" in class LinearGradient outputs the expected SVG code', () => {
      expect(testLinearGradient.generateGradientSVGCode("test"))
        .toEqual(`<linearGradient id="gradient-test" x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%" stop-color="hsl(120, 50%, 50%)"/>
    <stop offset="100%" stop-color="hsl(180, 50%, 50%)"/>
    </linearGradient>`);
    });

    it('Method "generateGradientSVGCode" in class RadialGradient outputs the expected SVG code outputs the expected SVG code', () => {
      expect(testRadialGradient.generateGradientSVGCode("test"))
        .toEqual(`<radialGradient id="radialGradient-test" cx="50%" cy="50%" r="70%" fx="50%" fy="50%">
    <stop offset="0%" stop-color="hsl(120, 50%, 50%)"/>
    <stop offset="100%" stop-color="hsl(240, 50%, 50%)"/>
    </radialGradient>`);
    });

    it('Method "calculateScale" in class CenterPiece returns the correct scale', () => {
      expect(testCenterPiece.calculateScale()).toEqual(1.337);
    });

    it('Method "generateUseElements" in class CenterPiece returns the expected SVG code', () => {
      expect(testCenterPiece.generateUseElements()).toEqual(
        `<use href="#CenterPiece-testCenterPiece" transform-origin="center center" transform=" rotate(0) translate(0, 77) scale(1.33700)"/>`
      );
    });

    it('Method "generatePatternSVGCode" in class CenterPiece returns the expected SVG code', () => {
      expect(testCenterPiece.generatePatternSVGCode()).toContain(
        testCenterPieceSVGcode
      );
    });

    it('Method "calculateScale" in class Layer returns the correct scale', () => {
      expect(testLayer.calculateScale()).toEqual(0.9713266812046099);
    });

    it('Method "generateUseElements" in class Layer returns the expected SVG code', () => {
      expect(testLayer.generateUseElements()).toEqual(
        `<use href="#Layer-testLayer" transform-origin="center center" transform="rotate(0) translate(0, -70) scale(0.97133)"/><use href="#Layer-testLayer" transform-origin="center center" transform="rotate(60) translate(0, -70) scale(0.97133)"/><use href="#Layer-testLayer" transform-origin="center center" transform="rotate(120) translate(0, -70) scale(0.97133)"/><use href="#Layer-testLayer" transform-origin="center center" transform="rotate(180) translate(0, -70) scale(0.97133)"/><use href="#Layer-testLayer" transform-origin="center center" transform="rotate(240) translate(0, -70) scale(0.97133)"/><use href="#Layer-testLayer" transform-origin="center center" transform="rotate(300) translate(0, -70) scale(0.97133)"/>`
      );
    });

    it('Method "generatePatternSVGCode" in class Layer returns the expected SVG code', () => {
      expect(testLayer.generatePatternSVGCode()).toContain(testLayerSVGcode);
    });

    it('Method "generateSVGCode" in class Mandala returns the expected SVG code for single layers mandala', () => {
      expect(testSingleLayerMandala.generateSVGCode()).toContain(
        singleLayerMandalaSVGcode
      );
    });

    it('Method "generateSVGCode" in class Mandala returns the expected SVG code for double layers mandala', () => {
      expect(testDoubleLayerMandala.generateSVGCode()).toContain(
        doubleLayerMandalaSVGcode
      );
    });
  });

  describe("Check all Functions's expected output and exception handling", () => {
    it('Function "hash" returns the correct SHA256 hash value', () => {
      expect(hash("test")).toEqual(
        "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08"
      );
    });

    it('Function "isValidRequestParameters" returns true if the inputs are valid', () => {
      expect(isValidRequestParameters("jpeg", 200, 200)).toBeTrue();
    });

    it('Function "isValidRequestParameters" should throw an error if the entered image format is not valid', () => {
      expect(() => isValidRequestParameters("none", 200, 200)).toThrowError(
        "The format requested is not supported!"
      );
    });

    it('Function "isValidRequestParameters" should throw an error if the entered image height is not valid', () => {
      expect(() => isValidRequestParameters("png", 20000, 200)).toThrowError(
        "Image height must be between 16 and 4096. Enter a valid height!"
      );
    });

    it('Function "isValidRequestParameters" should throw an error if the entered image width is not valid', () => {
      expect(() => isValidRequestParameters("png", 200, 20000)).toThrowError(
        "Image width must be between 16 and 4096. Enter a valid width!"
      );
    });

    it('Function "processImage" should return a buffer containing the image if the inputs are valid', async () => {
      const results = await processImage(
        200,
        200,
        "jpeg",
        true,
        "test",
        "test"
      );
      expect(results).toBeTruthy();
    });
  });
}
