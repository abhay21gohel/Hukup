import { authenticateUser, logInUser } from "../../apis/apis";
import {
  FETCH_USER_SUCCESS,
  FETCH_USER_REQUEST,
  FETCH_USER_FAILURE,
  LOGOUT_USER_REQUEST,
  SET_USER_PHONENUMBER,
  SET_USER_LOCATION,
} from "./types";

export const fetchUserRequest = () => {
  return {
    type: FETCH_USER_REQUEST,
  };
};

export const logoutUserRequest = () => {
  return {
    type: LOGOUT_USER_REQUEST,
  };
};

export const fetchUserSuccess = (user) => {
  return {
    type: FETCH_USER_SUCCESS,
    payload: user,
  };
};

export const fetchUserFailure = (error) => {
  return {
    type: FETCH_USER_FAILURE,
    payload: error,
  };
};
export const setUserPhoneNumber = (phoneNumber) => {
  return {
    type: SET_USER_PHONENUMBER,
    payload: phoneNumber,
  };
};

export const setUserLocation = (location) => {
  return {
    type: SET_USER_LOCATION,
    payload: location,
  };
};

export const fetchUser = (user) => {
  return async (dispatch) => {
    dispatch(fetchUserRequest());
    if (!user.token) {
      dispatch(fetchUserSuccess(user));
      return;
    }
    try {
      const { data } = await authenticateUser({ token: user?.token });

      if (data?.success) {
        dispatch(fetchUserSuccess(data?.data));
        logInUser(data?.data);
      } else {
        dispatch(fetchUserFailure(data?.data));
        localStorage.removeItem("user");
      }
    } catch (error) {
      dispatch(fetchUserFailure(error));
      localStorage.removeItem("user");
    }
  };
};
