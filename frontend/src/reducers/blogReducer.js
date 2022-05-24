import {
  ALL_BLOG_FAIL,
  ALL_BLOG_REQUEST,
  ALL_BLOG_SUCCESS,
  BLOG_DELETE_FAIL,
  BLOG_DELETE_REQUEST,
  BLOG_DELETE_RESET,
  BLOG_DELETE_SUCCESS,
  BLOG_DETAILS_FAIL,
  BLOG_DETAILS_REQUEST,
  BLOG_DETAILS_SUCCESS,
  CLEAR_ERROR,
  COMMENT_DELETE_FAIL,
  COMMENT_DELETE_REQUEST,
  COMMENT_DELETE_RESET,
  COMMENT_DELETE_SUCCESS,
  COMMENT_FAIL,
  COMMENT_REQUEST,
  COMMENT_RESET,
  COMMENT_SUCCESS,
  CREATE_BLOG_FAIL,
  CREATE_BLOG_REQUEST,
  CREATE_BLOG_RESET,
  CREATE_BLOG_SUCCESS,
  CREATE_CATEGORY_FAIL,
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  GET_A_CATEGORY_FAIL,
  GET_A_CATEGORY_REQUEST,
  GET_A_CATEGORY_SUCCESS,
  GET_CATEGORY_FAIL,
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,
  GET_SAVED_FAIL,
  GET_SAVED_REQUEST,
  GET_SAVED_SUCCESS,
  IS_SAVED_FAIL,
  IS_SAVED_REQUEST,
  IS_SAVED_SUCCESS,
  SAVE_BLOG_FAIL,
  SAVE_BLOG_REQUEST,
  SAVE_BLOG_SUCCESS,
  UPDATE_BLOG_FAIL,
  UPDATE_BLOG_REQUEST,
  UPDATE_BLOG_RESET,
  UPDATE_BLOG_SUCCESS,
  UPDATE_STATUS_FAIL,
  UPDATE_STATUS_REQUEST,
  UPDATE_STATUS_RESET,
  UPDATE_STATUS_SUCCESS,
  USER_BLOGS_FAIL,
  USER_BLOGS_REQUEST,
  USER_BLOGS_SUCCESS,
} from "../constants/blogConstants";

export const blogReducer = (state = { blogs: [] }, action) => {
  switch (action.type) {
    case ALL_BLOG_REQUEST:
    case CREATE_BLOG_REQUEST:
    case GET_SAVED_REQUEST:
    case UPDATE_BLOG_REQUEST:
      return {
        loading: true,
        ...state,
      };
    case BLOG_DETAILS_REQUEST:
      return {
        loading: true,
        ...state,
      };

    case ALL_BLOG_SUCCESS:
    case GET_SAVED_SUCCESS:
      return {
        loading: false,
        blogs: action.payload.blogs,
        count: action.payload.totalBlogs,
      };
    case UPDATE_BLOG_SUCCESS:
      return {
        loading: false,
        isUpdate: action.payload,
      };
    case CREATE_BLOG_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case BLOG_DETAILS_SUCCESS:
      return {
        loading: false,
        blog: action.payload,
      };
    case ALL_BLOG_FAIL:
    case BLOG_DETAILS_FAIL:
    case CREATE_BLOG_FAIL:
    case UPDATE_BLOG_FAIL:
    case GET_SAVED_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_BLOG_RESET:
      return {
        ...state,
        loading: false,
        isUpdate: false,
      };
    case CREATE_BLOG_RESET:
      return {
        ...state,
        loading: false,
        success: false,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const getUserBlogs = (state = { blogs: [] }, action) => {
  switch (action.type) {
    case USER_BLOGS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case USER_BLOGS_SUCCESS:
      return {
        loading: false,
        blogs: action.payload,
      };

    case USER_BLOGS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        loading: false,

        error: null,
      };
    default:
      return state;
  }
};

//Create comment reducer
export const createCommentReducer = (state = {}, action) => {
  switch (action.type) {
    case COMMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case COMMENT_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case COMMENT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case COMMENT_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const deleteReducer = (state = {}, action) => {
  switch (action.type) {
    case COMMENT_DELETE_REQUEST:
    case BLOG_DELETE_REQUEST:
      return {
        loading: true,
        isDeleted: false,
      };
    case COMMENT_DELETE_SUCCESS:
    case BLOG_DELETE_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload,
      };
    case COMMENT_DELETE_FAIL:
    case BLOG_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case COMMENT_DELETE_RESET:
    case BLOG_DELETE_RESET:
      return {
        ...state,
        loading: false,
        isDeleted: false,
      };

    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// CATEGORY REDUCER
export const categoryReducer = (state = { category: [] }, action) => {
  switch (action.type) {
    case CREATE_CATEGORY_REQUEST:
    case GET_CATEGORY_REQUEST:
    case GET_A_CATEGORY_REQUEST:
      return {
        loading: true,
        category: [],
      };

    case CREATE_CATEGORY_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };
    case GET_A_CATEGORY_SUCCESS:
      return {
        loading: false,
        category: action.payload,
      };
    case GET_CATEGORY_SUCCESS:
      return {
        loading: false,
        category: action.payload,
      };
    case CREATE_CATEGORY_FAIL:
    case GET_A_CATEGORY_FAIL:
    case GET_CATEGORY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Update Status
export const statusReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_STATUS_REQUEST:
      return {
        loading: true,
        success: false,
      };

    case UPDATE_STATUS_SUCCESS:
      return {
        loading: false,
        success: action.payload,
      };

    case UPDATE_STATUS_RESET:
      return {
        ...state,
        loading: false,
        success: false,
      };
    case UPDATE_STATUS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Update Status
export const checkSavedBlog = (state = {}, action) => {
  switch (action.type) {
    case IS_SAVED_REQUEST:
    case SAVE_BLOG_REQUEST:
      return {
        loading: true,
        isSaved: false,
      };

    case IS_SAVED_SUCCESS:
    case SAVE_BLOG_SUCCESS:
      return {
        loading: false,
        isSaved: action.payload,
      };

    case IS_SAVED_FAIL:
    case SAVE_BLOG_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
