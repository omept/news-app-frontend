import axios from "axios";
import { log } from "../_appBackendApi/appBackendApi";

export function authReducer(authState, action) {
  switch (action.type) {
    case "login": {
      localStorage.setItem('token', action.payload.token);
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
      localStorage.removeItem('token');
      return { user: {}, token: "", message: "" };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
