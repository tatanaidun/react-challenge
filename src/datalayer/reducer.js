export const initialState = {
  role: "",
  data: [],
  storeType: "Product",
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ROLE":
      return { ...state, role: action.role };
    case "REMOVE_ROLE":
      return { ...state, role: "" };
    case "SET_DATA":
      return { ...state, data: action.data };
    case "SET_RECORD":
      return { ...state, record: action.record };
    case "MODIFY_DATA":
      console.log({ ...state });
      console.log(action.data);
      console.log({ ...state, data: action.data });
      return { ...state, data: action.data };
    case "SET_STORE_TYPE":
      return { ...state, storeType: "" };
    default:
      return state;
  }
};
