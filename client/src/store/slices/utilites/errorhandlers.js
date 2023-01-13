export const errors = (error) => {
  // return custom error message from backend if present
  if (error.response && error.response.data.message) {
    return error.response.data.message;
  } else {
    return error.message;
  }
};
