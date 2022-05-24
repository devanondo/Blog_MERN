import axios from "axios";
import {
  ALL_BLOG_FAIL,
  ALL_BLOG_REQUEST,
  ALL_BLOG_SUCCESS,
  BLOG_DELETE_FAIL,
  BLOG_DELETE_REQUEST,
  BLOG_DELETE_SUCCESS,
  BLOG_DETAILS_FAIL,
  BLOG_DETAILS_REQUEST,
  BLOG_DETAILS_SUCCESS,
  CLEAR_ERROR,
  COMMENT_DELETE_FAIL,
  COMMENT_DELETE_REQUEST,
  COMMENT_DELETE_SUCCESS,
  COMMENT_FAIL,
  COMMENT_REQUEST,
  COMMENT_SUCCESS,
  CREATE_BLOG_FAIL,
  CREATE_BLOG_REQUEST,
  CREATE_BLOG_SUCCESS,
  GET_SAVED_FAIL,
  GET_SAVED_REQUEST,
  GET_SAVED_SUCCESS,
  IS_SAVED_FAIL,
  IS_SAVED_REQUEST,
  IS_SAVED_SUCCESS,
  UPDATE_BLOG_FAIL,
  UPDATE_BLOG_REQUEST,
  UPDATE_BLOG_SUCCESS,
  UPDATE_STATUS_FAIL,
  UPDATE_STATUS_REQUEST,
  UPDATE_STATUS_SUCCESS,
  USER_BLOGS_FAIL,
  USER_BLOGS_REQUEST,
  USER_BLOGS_SUCCESS,
} from "../constants/blogConstants";

//CREATE BLOG REDUCER
export const createBlog = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: CREATE_BLOG_REQUEST,
    });
    const config = { headers: { "Content-Type": "application/json" } };
    const link = "/api/blog/create";
    const { data } = await axios.post(link, formData, config);

    dispatch({
      type: CREATE_BLOG_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: CREATE_BLOG_FAIL,
      payload: error.response?.data.message,
    });
  }
};

//GET All blogs
export const getBlogs =
  (keyword = "", currentPage) =>
  async (dispatch) => {
    try {
      dispatch({
        type: ALL_BLOG_REQUEST,
      });

      const link = `/api/blog/all?keyword=${keyword}&page=${currentPage}&perpage=12`;
      console.log(link);
      const { data } = await axios.get(link);

      dispatch({
        type: ALL_BLOG_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_BLOG_FAIL,
        payload: error.response?.data.message,
      });
    }
  };

//GET All blogs
export const getBlogsAdmin =
  (keyword = "", currentPage, perPage) =>
  async (dispatch) => {
    try {
      dispatch({
        type: ALL_BLOG_REQUEST,
      });

      const link = `/api/blog/admin/all?keyword=${keyword}&page=${currentPage}&perpage=${perPage}`;
      const { data } = await axios.get(link);

      dispatch({
        type: ALL_BLOG_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ALL_BLOG_FAIL,
        payload: error.response?.data.message,
      });
    }
  };

//dELETE BLOGS
export const deleteBlog = (id) => async (dispatch) => {
  try {
    dispatch({
      type: BLOG_DELETE_REQUEST,
    });

    const { data } = await axios.delete(`/api/blog/delete/${id}`);

    dispatch({
      type: BLOG_DELETE_SUCCESS,
      payload: data.isDeleted,
    });
  } catch (error) {
    dispatch({
      type: BLOG_DELETE_FAIL,
      payload: error.response?.data.message,
    });
  }
};

//GET Single blog
export const getBlogDetails = (id) => async (dispatch) => {
  try {
    dispatch({
      type: BLOG_DETAILS_REQUEST,
    });

    const link = `/api/blog/${id}`;
    const { data } = await axios.get(link);

    dispatch({
      type: BLOG_DETAILS_SUCCESS,
      payload: data.blog,
    });
  } catch (error) {
    dispatch({
      type: BLOG_DETAILS_FAIL,
      payload: error.response?.data.message,
    });
  }
};

//Update Blogs
export const updateBlog = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_BLOG_REQUEST,
    });
    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(`/api/blog/${id}`, formData, config);

    dispatch({
      type: UPDATE_BLOG_SUCCESS,
      payload: data.isUpdate,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_BLOG_FAIL,
      payload: error.response?.data.message,
    });
  }
};

//Get user all blogs
export const getUserBlogs = (id) => async (dispatch) => {
  try {
    dispatch({
      type: USER_BLOGS_REQUEST,
    });

    const { data } = await axios.get(`/api/blog/user/${id}`);

    dispatch({
      type: USER_BLOGS_SUCCESS,
      payload: data.blogs,
    });
  } catch (error) {
    dispatch({
      type: USER_BLOGS_FAIL,
      payload: error.response?.data.message,
    });
  }
};

//Get user all blogs
export const createComment = (id, message) => async (dispatch) => {
  console.log(id, message);
  try {
    dispatch({
      type: COMMENT_REQUEST,
    });

    const { data } = await axios.post(`/api/blog/comment/${id}`, message);
    console.log(data);
    dispatch({
      type: COMMENT_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: COMMENT_FAIL,
      payload: error.response?.data.message,
    });
  }
};

//Delete a comment
export const deleteComment = (cid, mid) => async (dispatch) => {
  try {
    dispatch({
      type: COMMENT_DELETE_REQUEST,
    });

    const { data } = await axios.delete(`/api/blog/comment/${cid}/${mid}`);

    dispatch({
      type: COMMENT_DELETE_SUCCESS,
      payload: data.isDeleted,
    });
  } catch (error) {
    dispatch({
      type: COMMENT_DELETE_FAIL,
      payload: error.response?.data.message,
    });
  }
};

//Update status
export const updateStatus = (id, status) => async (dispatch) => {
  try {
    console.log(id);
    dispatch({
      type: UPDATE_STATUS_REQUEST,
    });

    const { data } = await axios.put(`/api/blog/admin/status/${id}`, status);

    dispatch({
      type: UPDATE_STATUS_SUCCESS,
      payload: data.success,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_STATUS_FAIL,
      payload: error.response?.data.message,
    });
  }
};

//Clear all error
export const clearError = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};

//Get saved Blogs --User
export const getSavedBlogs = (id) => async (dispatch) => {
  try {
    dispatch({
      type: GET_SAVED_REQUEST,
    });

    const { data } = await axios.get(`/api/blog/saveblog/all`);

    dispatch({
      type: GET_SAVED_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_SAVED_FAIL,
      payload: error.response?.data.message,
    });
  }
};

//Check saved blogs
export const isSavedBlogs = (id) => async (dispatch) => {
  try {
    dispatch({
      type: IS_SAVED_REQUEST,
    });

    const { data } = await axios.get(`/api/blog/issaved/${id}`);
    console.log(data);
    dispatch({
      type: IS_SAVED_SUCCESS,
      payload: data.isSaved,
    });
  } catch (error) {
    dispatch({
      type: IS_SAVED_FAIL,
      payload: error.response?.data.message,
    });
  }
};

//Check saved-unsave blog
export const saveBlog = (id) => async (dispatch) => {
  try {
    dispatch({
      type: IS_SAVED_REQUEST,
    });

    const { data } = await axios.put(`/api/blog/save/${id}`);
    console.log(data);
    dispatch({
      type: IS_SAVED_SUCCESS,
      payload: data.isSaved,
    });
  } catch (error) {
    dispatch({
      type: IS_SAVED_FAIL,
      payload: error.response?.data.message,
    });
  }
};
