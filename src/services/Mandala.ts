import patterns from '../Assets/patterns.json';


export default function () {

console.log(patterns);
}


const calculateScalingFactor = (r1, r2, h, sidesNum1, sidesNum2, scale) => {
  const h2 = (r2 / r1) * (sidesNum1 / sidesNum2) * h;
  const initialSideLength = 2 * (r1 + h) * Math.tan(Math.PI / sidesNum1);
  const finalSideLength = 2 * (r2 + h2) * Math.tan(Math.PI / sidesNum2);
  return scale * (finalSideLength / initialSideLength);
};

// Generate the required use elements
function generateUseElements(
  xTranslation,
  yTranslation,
  scale,
  shapesNumber,
  shapeId,
  startingAngle = 0
) {
  let useElements = ``;
  let angle = startingAngle;
  for (let i = 0; i < shapesNumber; i++) {
    useElements += `<use href="#${shapeId}" transform-origin="center center" transform="rotate(${angle}) translate(${xTranslation}, ${yTranslation}) scale(${scale})"/>`;
    angle += 360 / shapesNumber;
  }
  return useElements;
}
