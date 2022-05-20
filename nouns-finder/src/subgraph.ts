import { request, gql } from "graphql-request";
import { config } from "./config";
import { AuctionAndNoun } from "./types";

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
