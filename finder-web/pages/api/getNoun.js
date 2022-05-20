import { ImageData, getNounData } from "@lilnouns/assets";
import { buildSVG } from "@nouns/sdk";
const { palette } = ImageData;

export default function handler(req, res) {
  const params = JSON.parse(req.body);
  const seed = {
    background: 1,
    body: parseInt(params.body),
    accessory: parseInt(params.accessory),
    head: parseInt(params.head),
    glasses: parseInt(params.glasses),
  };

  const { parts, background } = getNounData(seed);
  console.log(parts);
  parts;
  const svgBinary = buildSVG(
    [parts[0], parts[1], parts[3]],
    palette,
    background
  );
  const svgBase64 = btoa(svgBinary);

  res.status(200).json({ response: svgBase64 });
}
