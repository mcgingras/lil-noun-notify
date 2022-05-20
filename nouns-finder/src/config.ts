import 'dotenv/config'


export const config = {
  redisPort: Number(process.env.REDIS_PORT ?? 6379),
  redisHost: process.env.REDIS_HOST ?? 'localhost',
  redisDb: Number(process.env.REDIS_DB ?? 0),
  redisPassword: process.env.REDIS_PASSWORD,

  nounsSubgraph:
    process.env.NOUNS_SUBGRAPH_URL ??
    'https://api.thegraph.com/subgraphs/name/lilnounsdao/lil-nouns-subgraph',
};
