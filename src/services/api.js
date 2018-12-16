import { get, isNil } from "lodash";
import { authorizeUser } from "../modular/auth";
import { getErrorActionType } from "./axios";

const isUnauthorized = status => status === 401;

const getAccessToken = () => localStorage.getItem("rythmify_token");
const getAuthHeader = token => {
  if (token) {
    return {
      Authorization: `Bearer ${token}`
    };
  }
  return {};
};

const redirectToLogin = () => dispatch => {
  const accessToken = getAccessToken();
  if (!isNil(accessToken)) {
    return dispatch(authorizeUser());
  }

  window.location.href = "/login";
};

const handleApiError = response => {
  const status = get(response, "error.response.status");
  const { error, action, next, options, dispatch } = response;
  // action is the starting action that being called
  if (isUnauthorized(status)) {
    return dispatch(redirectToLogin());
  }
  // declare the error object and pass it as property to action
  const errorObject = {
    message: error.message,
    code: error.response.status,
    config: error.config,
    response: error.response
  };
  // declare the action object which have type = ..._FAIL, error, payload object from response.action
  const nextAction = {
    type: getErrorActionType(action, options),
    error: errorObject,
    payload: action.payload
  };

  // dispatch the action with FAIL suffix
  next(nextAction);
  // return nextAction;
};

export const apiCall = ({
  endpoint,
  type,
  types,
  payload,
  method = "GET",
  ...opts
}) => dispatch => {
  // Get access token from state
  const token = getAccessToken();
  const authHeader = getAuthHeader(token);

  return dispatch({
    type,
    types,
    payload: {
      ...payload,
      request: {
        url: endpoint,
        method,
        headers: {
          ...authHeader
        },
        ...opts
      },
      options: {
        onError: handleApiError
      }
    }
  });
};
