const initialState = {
  user: {},
  invalid: false
}

export default function reducer(state = initialState, action) {
  switch(action.type) {
    case "LOGGED":
      console.log({...state, user: action.payload})
      return {...state, user: action.payload}
    case "SIGN_UP":
      return {...state}
    case "USERNAME":
      return {...state}
    case "INVALID":
      return {...state, invalid: action.payload}

    default:
    return state;
  }
}
