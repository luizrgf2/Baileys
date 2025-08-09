import NodeCache from "@cacheable/node-cache";

export const lidCache = new NodeCache({
  stdTTL: 3600, // 1 hour
  useClones: false,
});