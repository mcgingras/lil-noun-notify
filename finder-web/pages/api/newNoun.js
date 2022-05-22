import { prisma } from "../../db.js";

export default async function handler(req, res) {
  const { head, body, glasses, accessory } = JSON.parse(req.body);

  await prisma.savedSeed.findMany({
    where: {
      AND: [
        {
          head: {
            in: [head, 0],
          },
        },
        {
          body: {
            in: [body, 0],
          },
        },
        {
          glasses: {
            in: [glasses, 0],
          },
        },
        {
          accessory: {
            in: [accessory, 0],
          },
        },
      ],
    },
    include: { accounts: true },
  });
  // res.status(200).json({ response: svgBase64 });
}
