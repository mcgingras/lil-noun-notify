import { getCurrentNoun } from "./subgraph";
import { getNounCache, updateNounCache } from "./cache";
import { getNounData } from "@lilnouns/assets";
import { IAuctionLifecycleHandler } from "./types";
import { DCHandler } from "./handlers";

const auctionLifecycleHandlers: IAuctionLifecycleHandler[] = [];
auctionLifecycleHandlers.push(new DCHandler());

const setupAuction = async () => {
  const currentNoun = await getCurrentNoun();
  if (currentNoun) {
    const currentNounId = currentNoun?.id || 1;
    await updateNounCache(currentNounId);
    const data = getNounData(currentNoun?.noun?.seed);
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
  }
};

// run every 30 seconds
setInterval(async () => processAuctionTick(), 30000);
setupAuction().then(() => "setupAuction");
