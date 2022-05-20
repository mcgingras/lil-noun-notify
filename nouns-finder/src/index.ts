import { getCurrentNoun } from "./subgraph";
import { getNounCache, updateNounCache } from "./cache";
import { getNounData } from "@lilnouns/assets";

import { IAuctionLifecycleHandler } from "./types";

/**
 * Create configured `IAuctionLifecycleHandler`s
 */
const auctionLifecycleHandlers: IAuctionLifecycleHandler[] = [];

const setupAuction = async () => {
  const currentNoun = await getCurrentNoun();
  if (currentNoun) {
    const currentNounId = currentNoun?.id || 1;
    await updateNounCache(currentNounId);
    const data = getNounData(currentNoun?.noun?.seed);
    console.log(data);
  }
};

const processAuctionTick = async () => {
  const cachedNounId = await getNounCache();
  const currentNoun = await getCurrentNoun();
  const currentNounId = currentNoun?.id || 1;
  console.log(
    `processAuctionTick: cachedAuctionId(${cachedNounId}) currentnounId(${currentNounId})`
  );

  // check if new auction discovered
  if (cachedNounId < currentNounId) {
    await updateNounCache(currentNounId);
    await Promise.all(
      auctionLifecycleHandlers.map((h) => h.handleNewNoun(currentNounId))
    );

    // auction ending soon is just to notify if the auction is ending soon
    // not something we need neccessarily
  }
};

// run every 30 seconds
setInterval(async () => processAuctionTick(), 30000);
setupAuction().then(() => "setupAuction");
