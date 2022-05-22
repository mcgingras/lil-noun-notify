import { prisma } from "../../db.js";

const demo = async () => {
  let head = 1;
  let body = 1;
  let glasses = 1;
  let accessory = 1;

  const a = await prisma.savedSeed.findMany({
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

  console.log(a);
};

demo();
