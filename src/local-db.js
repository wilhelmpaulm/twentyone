import "localforage";

var localDb = localforage.createInstance({
  name: "twentyone",
  driver: localforage.INDEXEDDB,
  version: 1.0,
  size: 4980736,
  storeName: "twentyone",
  description: "the twentyone indexed db",
});

export default localDb;
