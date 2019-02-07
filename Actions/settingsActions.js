export const LOAD_SETTINGS_BEGIN = "LOAD_SETTINGS_BEGIN";
export const LOAD_SETTINGS_SUCCESS = "LOAD_SETTINGS_SUCCESS";
export const LOAD_SETTINGS_FAILURE = "LOAD_SETTINGS_FAILURE";

export const STORE_SETTINGS_BEGIN = "STORE_SETTINGS_BEGIN";
export const STORE_SETTINGS_SUCCESS = "STORE_SETTINGS_SUCCESS";
export const STORE_SETTINGS_FAILURE = "STORE_SETTINGS_FAILURE";

export const loadSettingsBegin = () => ({
  type: LOAD_SETTINGS_BEGIN
});

export const loadSettingsSuccess = settings => ({
  type: LOAD_SETTINGS_SUCCESS,
  payload: { settings }
});

export const loadSettingsFailure = error => ({
  type: LOAD_SETTINGS_FAILURE,
  payload: { error }
});

export const storeSettingsBegin = () => ({
  type: STORE_SETTINGS_BEGIN
});

export const storeSettingsSuccess = settings => ({
  type: STORE_SETTINGS_SUCCESS,
  payload: { settings }
});

export const storeSettingsFailure = error => ({
  type: STORE_SETTINGS_FAILURE,
  payload: { error }
});

export const loadSettings = deviceId => {
  return dispatch => {
    dispatch(loadSettingsBegin());

    fetch(`pathToOurSettingsApi/${deviceId}`)
      .then(res => res.json())
      .then(resJson => {
        dispatch(loadSettingsSuccess(resJson));
      })
      .catch(error => dispatch(loadSettingsFailure(error)));
  };
};

export const storeSettings = (deviceId, newSettings) => {
  return dispatch => {
    dispatch(storeSettingsBegin());
    fetch(`pathToOurSettingsApi/${deviceId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newSettings)
    })
      .then(res => {
        if(!res.ok)
        {
          throw Error(res.statusText);
        }
        return res.json();
      })
      .then(resJson => {
        dispatch(storeSettingsSuccess(resJson));
      })
      .catch(error => dispatch(storeSettingsFailure(error)));
  };
};
