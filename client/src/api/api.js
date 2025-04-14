import axios from "axios";
import getUserDetails from "../util/GetUser";
import getErrorMessage from "../util/GetError";
import { toast } from "react-toastify";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const userToken = getUserDetails()?.token;
const authHeaders = () => {
  if (!userToken) {
    console.error('User token is missing or invalid.');
    return null;
  }
  return { headers: { 'Authorization': 'Bearer ' + userToken } };
};
const registerUser = async (data) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/api/user/Register`, data);
    console.log("res", res);
    return res;

  } catch (error) {
    console.error("Login failed:", getErrorMessage(error));
    throw error;
  }
};
const loginUser = async (data) => {
  try {
    return await axios.post(`${API_BASE_URL}/api/user/login`, data, { withCredentials: true });
  } catch (error) {
    console.error("Login failed:", error.message);
    throw error;
  }
};
const updateUser = async (data) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/api/user/update`, data, authHeaders());
    console.log(res, "uppres");

  } catch (error) {
    console.error("Login failed:", error.message);
    throw error;
  }
};
const logoutUser = async () => {
  try {
    return await axios.post(`${API_BASE_URL}/api/user/logout`, {}, { headers: { Authorization: `Bearer ${userToken}` }, withCredentials: true });
  } catch (error) {
    console.error("Login failed:", error.message);
    throw error;
  }
}
const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/api/user/delete/${userId}`, authHeaders()); // Pass auth headers
    // if(response.status===404){
    //   console.log("deleteeeeeeee");

    // }
    return response;
  } catch (error) {
    toast.error(getErrorMessage(error))
    console.error("Delete user failed:", error.message);
    throw error;
  }
};


const addTask = async (data) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/api/todo/addTask`, data, authHeaders());
    console.log("res", res);
    return res;

  } catch (error) {
    console.error("Adding Task failed:", error);
    throw error;
  }
}
const deleteTask = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE_URL}/api/todo/deleteTask/${id}`, authHeaders());
    console.log("Delete res", res);
    return res;

  } catch (error) {
    toast.error(getErrorMessage(error))
    console.error("Adding Task failed:", getErrorMessage(error));
    throw error;
  }
}
const updateTask = async (data) => {
  console.log("datatttttttt-->", data);

  try {
    const res = await axios.post(
      `${API_BASE_URL}/api/todo/updateTask`,
      data,
      authHeaders()
    );
    console.log("Update Response--->>>:", res);
    return res;
  } catch (error) {
    console.error("Update Task failed:--->>>>>", error.response?.data || error.message);
    throw error;
  }
};
const allTask = async (userId) => {
  try {
    const res = await axios.post(`${API_BASE_URL}/api/todo/allTask`, { id: userId }, authHeaders());
    console.log("res", res);
    return res;

  } catch (error) {
    console.log("Adding Task failed:", getErrorMessage(error));
    throw error;
  }
}
const todoServices = { addTask, deleteTask, updateTask, allTask }
const authServices = {
  loginUser, registerUser, updateUser, logoutUser, deleteUser
};

export default { authServices, todoServices };