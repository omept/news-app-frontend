import { log } from "../_appBackendApi/appBackendApi";

export function metaReducer(authState, action) {
  switch (action.type) {
    case "changed": {

      localStorage.setItem("meta", action.payload);
      log('persisted meta with:');
      log(action.payload);
      return action.payload;
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
