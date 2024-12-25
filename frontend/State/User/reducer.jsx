import {
  FETCH_USER_SUCCESS,
  FETCH_USER_REQUEST,
  FETCH_USER_FAILURE,
  LOGOUT_USER_REQUEST,
  SET_USER_PHONENUMBER,
  SET_USER_LOCATION,
} from "./types";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_USER_FAILURE:
      return {
        loading: false,
        data: state.data,
        error: action.payload,
      };

    case FETCH_USER_SUCCESS:
      return {
        loading: false,
        error: null,
        data: action.payload,
      };

    case SET_USER_PHONENUMBER:
      return {
        loading: false,
        error: null,
        data: {
          ...state.data,
          countryCode: action.payload.countryCode,
          phoneNumber: action.payload.phoneNumber,
        },
      };

    case SET_USER_LOCATION:
      return {
        loading: false,
        error: null,
        data: {
          ...state.data,
          latitude: action.payload.latitude,
          longitude: action.payload.longitude,
        },
      };

    case LOGOUT_USER_REQUEST:
      return {
        loading: false,
        error: null,
        data: null,
      };

    default:
      return state;
  }
};

export default reducer;
