function setStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getStorage(key) {
  const storageData = localStorage.getItem(key);
  let backData = '';
  if (storageData) {
    backData = JSON.parse(storageData);
  }
  return backData;
}

function removeStorage(key) {
  localStorage.removeItem(key);
}

export {
  setStorage,
  getStorage,
  removeStorage,
};
