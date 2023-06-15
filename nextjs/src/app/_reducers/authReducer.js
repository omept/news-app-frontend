import axios from "axios";
import { log } from "../_appBackendApi/appBackendApi";

export function authReducer(authState, action) {
  switch (action.type) {
    case "login": {
      return action.payload;
    }

    case "sign-up": {
      return tasks.map((t) => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case "logout": {
      log("logout called");
      return { user: {}, token: "", message: "" };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
