import {
  FETCH_SERVICES_SUCCESS,
  FETCH_SERVICE_SUCCESS,
  REQUEST_SERVICE,
  SET_AUTH_USER,
  RESET_AUTH_STATE,
} from "types";

import * as api from "api";

//service start
export const fetchServices = () => (dispatch) =>
  api.fetchServices().then((services) =>
    dispatch({
      type: FETCH_SERVICES_SUCCESS,
      services,
    })
  );

export const fetchServiceById = (serviceId) => (dispatch, getState) => {
  const lastService = getState().selectedService.item;
  if (lastService.id && lastService.id === serviceId) {
    return Promise.resolve();
  }

  dispatch({ type: REQUEST_SERVICE });
  return api.fetchServiceById(serviceId).then((service) =>
    dispatch({
      type: FETCH_SERVICE_SUCCESS,
      service,
    })
  );
};

export const createService = (newService, userId) => {
  newService.price = parseInt(newService.price, 10);
  newService.user = userId;

  return api.createService(newService);
};
//service end

//Auth starts
export const register = (registerFormData) => {
  return api.register({ ...registerFormData }).then(
    (_) => {
      return true;
    },
    (errorMessage) => Promise.reject(errorMessage)
  );
};

export const login = (loginData) => {
  return api.login({ ...loginData });
};
export const logout = () => (dispatch) =>
  api.logout().then((_) => dispatch({ user: null, type: SET_AUTH_USER }));

export const onAuthStateChanged = (onAuthCallback) =>
  api.onAuthStateChanged(onAuthCallback);

export const storeAuthUser = (authUser) => (dispatch) => {
  if (authUser) {
    return api.getUserProfile(authUser.uid).then((userWithProfile) => {
      // Dispatch action to change auth state!

      dispatch({ user: userWithProfile, type: SET_AUTH_USER });
    });
  } else {
    // Dispatch action
    return dispatch({ user: null, type: SET_AUTH_USER });
  }
};

export const resetAuthState = () => ({ type: RESET_AUTH_STATE });
//Auth ends
