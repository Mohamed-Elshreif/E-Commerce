export const config = (token) => {
  if (token) {
    return {
      "Content-Type": "application/json",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  } else {
    return {
      "Content-Type": "application/json",
    };
  }
};
