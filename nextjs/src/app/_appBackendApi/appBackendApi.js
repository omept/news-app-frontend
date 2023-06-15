import axios from "axios";

export function log(args) {
  console.log(args);
}

export const appBackendApi = function (baseUrl) {
  return {
    login: async function (email, password) {
      let message = "Login successful";
      let user = {};
      let ok =true;
      let token = {};
      const res = await axios.post(`${baseUrl}/auth/login`, {
        email,
        password,
      }).catch(err => {message = "Invalid credentials"; ok = false});

      if(res && res.data && res.data.data){
        user = res.data.data.user;
        token = res.data.data.access_token;
      }

      return {
        message,
        user: {...user},
        token: token,
        ok,
      };
    }
  };
};
