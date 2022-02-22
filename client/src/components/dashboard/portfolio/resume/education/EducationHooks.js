/**
 * Post data method.
 * @param {url} url api url
 * @param {method} method request type
 * @returns
 */
const postData = async (url = "", data = {}) => {
  // Default options are marked with *
  console.log(JSON.stringify(data));
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    body: JSON.stringify(data), // body data type must match "Content-Type" header
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
/**
 * Get ifram content
 */
const getIframeContent = () => {
  let textareaId = document
    .getElementsByTagName("textarea")[1]
    .getAttribute("id");
  let iframeContent = document.getElementById(textareaId + "_ifr").contentWindow
    .document.body.innerHTML;

  return iframeContent;
};
/**
 * Get component name
 */
const getComponentName = () => {
  let pathArr = window.location.pathname.split("/");
  let componentName = pathArr[pathArr.length - 1];

  return componentName[0].toUpperCase() + "" + componentName.slice(1);
};

// Create table headers consisting of 4 columns.
const STORY_HEADERS = [
  {
    prop: "details",
    title: "Details",
  },
  {
    prop: "name",
    title: "Name",
  },
  {
    prop: "summery",
    title: "Summery",
  },
];

module.exports = {
  getData,
  postData,
  getIframeContent,
  getComponentName,
  STORY_HEADERS,
};
