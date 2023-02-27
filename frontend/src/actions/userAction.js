import axios from "axios";
import {
  ALL_USER_FAIL,
  ALL_USER_REQUEST,
  ALL_USER_SUCCESS,
  CLEAR_ERROR,
  FOLLOW_FAIL,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOGIN_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  UNFOLLOW_FAIL,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_ROLE_FAIL,
  UPDATE_ROLE_REQUEST,
  UPDATE_ROLE_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
} from "../constants/userConstants";

//Register a user
export const register = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: REGISTER_REQUEST,
    });
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post("/api/blog/register", formData, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//login a user
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_REQUEST,
    });
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      "/api/blog/login",
      { email, password },
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Get all users --Admin
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: ALL_USER_REQUEST,
    });
    const { data } = await axios.get("/api/blog/users/all");

    dispatch({ type: ALL_USER_SUCCESS, payload: data.users });
    console.log(data);
  } catch (error) {
    dispatch({
      type: ALL_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Get userDetails
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`/api/blog/userinfo/${id}`);

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Update user Role
export const updateUserRole = (id, role) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_ROLE_REQUEST,
    });
    const { data } = await axios.put(`/api/blog/admin/user/${id}`, role);

    dispatch({ type: UPDATE_ROLE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_ROLE_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    const { data } = await axios.get("/api/blog/me");

    dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: ALL_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Logout user
export const logout = () => async (dispatch) => {
  try {
    const { data } = await axios.get("/api/blog/logout");

    dispatch({ type: LOGOUT_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Follow a user
export const follow = (id) => async (dispatch) => {
  try {
    dispatch({ type: FOLLOW_REQUEST });

    let { data } = await axios.put(`/api/blog/user/${id}/follow`);

    dispatch({ type: FOLLOW_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FOLLOW_FAIL,
      payload: error.response.data.message,
    });
  }
};

//UnFollow a user
export const unFollow = (id) => async (dispatch) => {
  try {
    dispatch({ type: UNFOLLOW_REQUEST });

    let { data } = await axios.put(`/api/blog/user/${id}/unfollow`);

    dispatch({ type: UNFOLLOW_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: UNFOLLOW_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Update user
export const updateUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    let { data } = await axios.put(`/api/blog/user/update`, userData);

    dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Update password
export const updatePassword = (password) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    let { data } = await axios.put(`/api/blog/password/update`, password);

    dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Clear all error
export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
