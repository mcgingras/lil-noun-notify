import axios from "axios";
import { IAuctionLifecycleHandler, AuctionAndNoun } from "./types";

export class DCHandler implements IAuctionLifecycleHandler {
  async handleNewNoun(auction: AuctionAndNoun) {
    console.log("new auction");

    const res = await axios.post(
      "http://localhost:3000/api/newNoun",
      auction.noun.seed
    );
  }
}
