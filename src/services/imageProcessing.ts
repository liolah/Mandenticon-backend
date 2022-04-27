import sharp from "sharp";
import fs from "fs";
import { FormatEnum } from "sharp";
import { createMandala } from "./mandalaService";
import svgRasterizer from "./svgRasterizationService";
import path from "path";

const isValidRequestParameters = (
  format: string,
  height: number,
  width: number
): boolean => {
  const acceptableFormats = [
    "heic",
    "heif",
    "avif",
    "jpeg",
    "jpg",
    "png",
    "raw",
    "tiff",
    "tif",
    "webp",
    "gif",
    "jp2",
    "jpx",
    "j2k",
    "j2c",
  ];

  if (!acceptableFormats.includes(format) && format != undefined) {
    throw new Error(`The format requested is not supported!`);
  } else if ((height < 16 || height > 4096) && height != undefined) {
    throw new Error(
      `Image height must be between 16 and 4096. Enter a valid height!`
    );
  } else if ((width < 16 || width > 4096) && width != undefined) {
    throw new Error(
      `Image width must be between 16 and 4096. Enter a valid width!`
    );
  } else {
    return true;
  }
};

const processImage = async (
  w: number,
  h: number,
  f: string,
  greyScale: string,
  tint: string,
  d: string
): Promise<Buffer> => {
  try {
    isValidRequestParameters(f, h, w);
    const data = d || `Something`;
    const mandala = createMandala(data);
    const height = h || 1200;
    const width = w || 1200;
    const format = f || "png";
    const greyScaleEffect = greyScale == "true" ? true : false;
    const tintEffect = tint && tint != "ffffff";
    const dir = path.resolve("temp");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    const rasterizedMandala = await svgRasterizer(
      mandala,
      format,
      width,
      height
    );
    let processedImage;
    if (greyScaleEffect) {
      processedImage = await sharp(rasterizedMandala)
        .greyscale()
        .toFormat(format as keyof FormatEnum)
        .toFile(path.resolve(dir, `temp.${format}`));
    } else if (tintEffect && !greyScaleEffect) {
      processedImage = await sharp(rasterizedMandala)
        .tint(`#${tint}`)
        .toFormat(format as keyof FormatEnum)
        .toFile(path.resolve(dir, `temp.${format}`));
    } else {
      processedImage = await sharp(rasterizedMandala)
        .toFormat(format as keyof FormatEnum)
        .toFile(path.resolve(dir, `temp.${format}`));
    }
    return processedImage;
  } catch (error) {
    throw new Error(error as unknown as string);
  }
};

export { isValidRequestParameters, processImage };
