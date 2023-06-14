import axios from "axios";
import { log } from "../_appBackendApi/appBackendApi";

export async function authReducer(authState, action) {
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_API;

  switch (action.type) {
    case "login": {
      let message = "Login successful";
      let user = {};
      let ok = true;
      let token = {};
      const res = await axios
        .post(`${baseUrl}/auth/login`, {
          email: action.payload.email,
          password: action.payload.password,
        })
        .catch((err) => {
          message = "Invalid credentials";
          ok = false;
        });

      if (res && res.data && res.data.data) {
        user = res.data.data.user;
        token = res.data.data.access_token;
      }

      const data = {
        message,
        user: { ...user },
        token: token,
        ok,
      };
      return data;
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
    case "deleted": {
      return tasks.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
