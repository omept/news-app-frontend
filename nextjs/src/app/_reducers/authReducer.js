import { log } from "../_appBackendApi/appBackendApi";

export function authReducer(authState, action) {
  switch (action.type) {
    case "login": {
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", action.payload.user.email);
      return action.payload;
    }
    case "sign-up": {
      localStorage.setItem("token", action.payload.token);
      return action.payload;
    }
    case "settings_update": {
      return action.payload;
    }
    case "logout": {
      log("logout called");
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      return { user: {}, token: "", message: "" };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
