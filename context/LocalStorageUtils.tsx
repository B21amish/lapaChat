export const setUserId = (userId: string): void => {
  try {
    localStorage.setItem("UserId", userId);
  } catch (e) {
    console.error("Could not set UserId in localStorage", e);
  }
};

export const getUserId = (): string | null => {
  try {
    return localStorage.getItem("UserId");
  } catch (e) {
    console.error("Could not get UserId from localStorage", e);
    return null;
  }
};
