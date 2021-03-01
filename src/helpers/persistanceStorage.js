const getItem = key => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (e) {
    console.log('error getting data from localStorage', e);
    return null;
  }
};

const setItem = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.log('error saving data from local storage');
  }
};

export default {
  getItem,
  setItem
};
