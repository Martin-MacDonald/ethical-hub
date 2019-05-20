export const initialState = {

};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_USERNAME':
      return { ...state, username: action.username };
    default:
      return state;
  }
};