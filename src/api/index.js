import "firebase/auth";

import db from "db";

export * from "./services";

export * from "./auth";

export * from "./offers";
export * from "./collaboration";

export const createRef = (collection, docId) =>
  db.collection(collection).doc(docId);
