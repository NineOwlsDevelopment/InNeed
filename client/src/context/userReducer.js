export const USER_STATE = {
  isAuth: localStorage.getItem("isAuth"),
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("isAuth", true);

      return {
        user: action.payload,
      };

    case "LOGOUT":
      localStorage.setItem("isAuth", false);

      return {
        user: {
          isAuth: false,
        },
      };

    case "ERROR":
      localStorage.setItem("isAuth", false);

      return {
        user: {
          isAuth: false,
        },
      };

    default:
      return state;
  }
};
