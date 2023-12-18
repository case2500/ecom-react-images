import axios from "axios";
import {URL} from "../../../URL"
const text_token = localStorage.getItem("token");
const authtoken = JSON.parse(text_token);

export const changeStatus = async (authtoken, value) => {
  return await axios.post(`${URL}order/change-status`, value, {
    headers: {
      authtoken,
    },
  });
};

export const changeRole = async (authtoken, values) => {
   return await axios.post(`${URL}change-role`, values,{
  headers : {
    authtoken
    }
   });
};

export const removeUser = async (id) => {
  return await axios.delete(`${URL}/user/` + id, {
    headers: {
      authtoken,
    },
  });
};


