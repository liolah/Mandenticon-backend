import sharp from "sharp";
import { FormatEnum } from "sharp";
import { createMandala } from "./mandalaService";


// Edit image dimensions min 16 * 16, max 4096 * 4096. if null default to 500
// EDit image format
// Add greyScale effect
// TODO: ADD tint control

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
  greyScale: boolean,
  d: string
): Promise<Buffer> => {
  try {
    isValidRequestParameters(f, h, w);
    const data = d || `Something`;
    const mandala = createMandala(data);
    const buff = Buffer.from(mandala, "utf8");
    const height = h || 1200;
    const width = w || 1200;
    const format = f || "png";
    const greyScaleEffect = greyScale || false;
    let processedImage: any;
    if (greyScaleEffect) {
      processedImage = await sharp(buff)
        .resize(width, height)
        .greyscale()
        .toFormat(format as keyof FormatEnum)
        .toFile('../est.png');
    } else {
      processedImage = await sharp(buff)
        .resize(width, height)
        .toFormat(format as keyof FormatEnum)
        .toFile('./test.png');
    }
    return processedImage;
  } catch (error) {
    throw new Error(error as unknown as string);
  }
};

export { isValidRequestParameters, processImage };