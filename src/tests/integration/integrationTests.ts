import { createMandala } from "../../services/mandalaService";
import { processImage } from "../../services/imageProcessing";
import svgRasterizer from "../../services/svgRasterizationService";
import { doubleLayerMandalaSVGcode } from "../objects/testObjects";

export default function () {
  describe("Integration Tests", () => {
    it('Function "createMandala" returns the correct mandala SVG', () => {
      expect(createMandala("test")).toContain(doubleLayerMandalaSVGcode);
    });

    it('Function "svgRasterizer" returns a png image from the svg generated by "createMandala()"', async () => {
      expect(await svgRasterizer(createMandala("test"), 'png', 200, 200)).toBeTruthy();
    });

    it('Function "svgRasterizer" returns a jpeg image from the svg generated by "createMandala()"',async () => {
      expect(await svgRasterizer(createMandala("test"), 'jpeg', 200, 200)).toBeTruthy();
    });

    it('Function "processImage" returns a buffer containing the processed image',async () => {
      expect(await processImage(200, 200, 'test', true, '000000', 'test')).toThrow();
    });
  });
}