export interface AuctionAndNoun {
  id: number;
  endTime: number;
  noun: Noun;
}

export interface IAuctionLifecycleHandler {
  handleNewNoun(nounId: number): Promise<void>;
}

export interface Noun {
  id: string;
  seed: NounSeed;
}

export interface NounSeed {
  background: number;
  body: number;
  accessory: number;
  head: number;
  glasses: number;
}

export interface EncodedImage {
  filename: string;
  data: string;
}

export interface NounData {
  parts: EncodedImage[];
  background: string;
}
