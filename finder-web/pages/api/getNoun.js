import { ImageData, getNounData } from "@lilnouns/assets";
import { buildSVG } from "@nouns/sdk";
const { palette } = ImageData;

const partsToIndex = {
  body: 0,
  accessory: 1,
  head: 2,
  glasses: 3,
};

export default function handler(req, res) {
  const params = JSON.parse(req.body);
  const seed = {
    background: parseInt(params.background) || 1,
    body: parseInt(params.body) || 1,
    accessory: parseInt(params.accessory) || 1,
    head: parseInt(params.head) || 1,
    glasses: parseInt(params.glasses) || 1,
  };

  const { parts, background } = getNounData(seed);

  let filteredParts = Object.keys(seed).reduce((acc, entry) => {
    if (params[entry]) {
      acc.push(parts[partsToIndex[entry]]);
    }
    return acc;
  }, []);

  const svgBinary = buildSVG(filteredParts, palette, background);
  const svgBase64 = btoa(svgBinary);

  res.status(200).json({ response: svgBase64 });
}
