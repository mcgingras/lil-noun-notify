import { IAuctionLifecycleHandler } from "./types";

export class DCHandler implements IAuctionLifecycleHandler {
  async handleNewNoun(auctionId: number) {
    console.log("new auction");

    // 1. get noun traits from new auction
    // 2. get all users that have saved traits (probably need to hit API endpoint, is that possible in a bot?)
    // 3. notify all users
  }
}
