import axios from "axios";
import { log } from "../_appBackendApi/appBackendApi";

export function authReducer(authState, action) {
  switch (action.type) {
    case "login": {
      localStorage.setItem("token", action.payload.token);
      return action.payload;
    }
    case "sign-up": {
      localStorage.setItem("token", action.payload.token);
      return action.payload;
    }
    case "logout": {
      log("logout called");
      localStorage.removeItem("token");
      return { user: {}, token: "", message: "" };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
