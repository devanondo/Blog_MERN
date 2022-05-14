import axios from "axios";
import {
  CLEAR_ERROR,
  CREATE_CATEGORY_FAIL,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  GET_A_CATEGORY_FAIL,
  GET_A_CATEGORY_REQUEST,
  GET_A_CATEGORY_SUCCESS,
  GET_CATEGORY_FAIL,
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,
} from "../constants/blogConstants";

//Create Category
export const createCategory = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_CATEGORY_REQUEST,
    });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `/api/blog/admin/category/create`,
      formData,
      config
    );

    dispatch({
      type: CREATE_CATEGORY_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: CREATE_CATEGORY_FAIL,
      payload: error.response?.data.message,
    });
  }
};

//get Category
export const getAllCategory = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_CATEGORY_REQUEST,
    });

    const { data } = await axios.get(`/api/blog/category/all`);
    dispatch({
      type: GET_CATEGORY_SUCCESS,
      payload: data.category,
    });
  } catch (error) {
    dispatch({
      type: GET_CATEGORY_FAIL,
      payload: error.response?.data.message,
    });
  }
};
//get Category
export const getACategory = (category) => async (dispatch) => {
  try {
    dispatch({
      type: GET_A_CATEGORY_REQUEST,
    });

    const { data } = await axios.get(`/api/blog/category/${category}`);
    dispatch({
      type: GET_A_CATEGORY_SUCCESS,
      payload: data.category,
    });
  } catch (error) {
    dispatch({
      type: GET_A_CATEGORY_FAIL,
      payload: error.response?.data.message,
    });
  }
};

//Clear all error
export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};
