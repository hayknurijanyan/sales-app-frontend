export const clearUserData = () => localStorage.clear();
export const getUserData = () => JSON.parse(localStorage.getItem("user"));
export const addDataToLocalStorage = (field, data) =>
  localStorage.setItem(field, JSON.stringify(data));
