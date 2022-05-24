import { request, gql } from "graphql-request";
import { config } from "./config";
import { AuctionAndNoun, PartialNounSeed, Noun } from "./types";

/**
 * Query the subgraph and return the current auction id and noun seeds.
 * @returns The current auction id and noun seeds from the subgraph.
 */
export async function getCurrentNoun(): Promise<AuctionAndNoun | undefined> {
  const res = await request<{ auctions: AuctionAndNoun[] }>(
    config.nounsSubgraph,
    gql`
      query {
        auctions(orderBy: startTime, orderDirection: desc, first: 1) {
          id
          endTime
          noun {
            seed {
              background
              body
              head
              glasses
              accessory
            }
          }
        }
      }
    `
  );
  return res.auctions[0];
}

/**
 * Query the subgraph and return all nouns that carry certain traits.
 * @returns a list of Noun types.
 */
export async function getNounsBySeed(
  seed: PartialNounSeed
): Promise<Noun[] | undefined> {
  const searchSeed = {
    ...(seed.background && { head: seed.background }),
    ...(seed.head && { head: seed.head }),
    ...(seed.glasses && { head: seed.glasses }),
    ...(seed.body && { head: seed.body }),
    ...(seed.accessory && { head: seed.accessory }),
  };
  const seedRes = await request<{ seeds: { id: number }[] }>(
    config.nounsSubgraph,
    gql`
      query {
        {
          seeds(where: ${searchSeed}){
            id
          }
        }
      }
    `
  );

  const ids = seedRes.seeds.map((seed) => seed.id);

  // get nouns by seed ids
  const nounRes = await request<{ nouns: Noun[] }>(
    config.nounsSubgraph,
    gql`
      query {
        nouns(where: { seed_in: ${ids} }) {
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
