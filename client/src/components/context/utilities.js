/**
 * Load all scripts.
 * @param {url} script url
 */
const addScripts = (scripts) => {
  [...scripts].forEach((scirpt) => {
    let tag = document.createElement("script");
    tag.async = true;
    tag.src = scirpt;
    document.body.appendChild(tag);
  });
};

/**
 * Post data method.
 * @param {url} url api url
 * @param {method} method request type
 * @returns
 */
const postData = async (url = "", data = {}) => {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    body: data, // body data type must match "Content-Type" header
  });
  const responseData = await response.json(); // parses JSON response into native JavaScript objects

  return responseData;
};

/**
 * get data methon
 * @param {url} url api url
 * @returns  data mixed.
 */
const getData = async (url = "") => {
  const response = await fetch(url);
  const data = await response.json();
  return data; // parses JSON response into native JavaScript objects
};

module.exports = {
  addScripts,
  getData,
  postData
};
