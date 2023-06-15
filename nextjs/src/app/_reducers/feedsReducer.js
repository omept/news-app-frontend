import { log } from "../_appBackendApi/appBackendApi";

export function feedsReducer(feedsState, action) {
  switch (action.type) {
    case "changed": {
      localStorage.setItem("feeds", action.payload);
      log("persisted feeds with:");
      log(action.payload);
      return action.payload;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
