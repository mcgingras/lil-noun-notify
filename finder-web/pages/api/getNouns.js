import { request, gql } from "graphql-request";

/**
 * Query the subgraph and return all nouns that carry certain traits.
 * @returns a list of Noun types.
 */
export async function getNounsBySeed(seed) {
  const filteredSeed = Object.keys(seed).reduce((acc, entry) => {
    if (seed[entry] !== "-1") {
      acc[entry] = seed[entry];
    }
    return acc;
  }, {});

  const seedRes = await request(
    "https://api.thegraph.com/subgraphs/name/lilnounsdao/lil-nouns-subgraph",
    gql`
      query {
        seeds(where: ${JSON.stringify(filteredSeed).replaceAll('"', "")}) {
          id
        }
      }
    `
  );

  const ids = seedRes.seeds.map((seed) => String(seed.id));

  // get nouns by seed ids
  const nounRes = await request(
    "https://api.thegraph.com/subgraphs/name/lilnounsdao/lil-nouns-subgraph",
    gql`
    query {
      nouns(where: { seed_in: ${JSON.stringify(ids)} }) {
        id
        seed {
          id
          head
          body
          glasses
          accessory
        }
      }
    }
  `
  );

  return nounRes.nouns;
}

export default async function handler(req, res) {
  const params = JSON.parse(req.body);
  const nouns = await getNounsBySeed(params);
  res.status(200).json({ nouns: nouns });
}
