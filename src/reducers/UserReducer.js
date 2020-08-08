export const initialState = null;
//Reducer funtion for managing states
export const reducer = (state, action) => {
  if (action.type == "USER") {
    return action.payload;
  }
  if (action.type == "END") {
    return null;
  }
  if (action.type == "UPDATE") {
    return {
      ...state,
      followers: action.payload.followers,
      following: action.payload.following,
    };
  }
  if (action.type == "UPDATEPIC") {
    return {
      ...state,
      pic: action.payload,
    };
  } else {
    return state;
  }
};
