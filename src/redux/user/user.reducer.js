import userActionTypes from "./user.types"

const INITIAL_STATE = {
  access_token: null,
  refresh_token: null,
  id: null,
  username: null,
  email: null,
  fetching_auth_token: false,
  error: null
}

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userActionTypes.SET_USER:
      return {
        ...action.payload,
        fetching_auth_token: false,
        error: null
      }
    case userActionTypes.CLEAR_USER:
      return INITIAL_STATE
    case userActionTypes.USER_REFRESH_START:
      return {
        ...state,
        fetching_auth_token: true
      }
    case userActionTypes.USER_SIGN_IN_START:
      return {
        ...state,
        fetching_auth_token: true
      }
    case userActionTypes.SET_ACCESS_TOKEN:
      return {
        ...state,
        fetching_auth_token: false,
        access_token: action.payload,
        error: null
      }
    case userActionTypes.USER_REFRESH_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case userActionTypes.USER_SIGN_IN_ERROR:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}

export default userReducer