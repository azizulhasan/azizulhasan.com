/**
 * Load all scripts.
 * @param {url} script url
 */
const addScripts = (scripts) => {
  console.log(scripts);
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

let lastUrl = window.location.pathname;
let componentName = "";

new MutationObserver(() => {
  const url = window.location.pathname;
  if (url !== lastUrl) {
    lastUrl = url;
    componentName = getName(lastUrl);
  }
}).observe(document, { subtree: true, childList: true });

/**
 * Get component name
 */
const getComponentName = () => {
  return componentName ? componentName : getName(window.location.pathname);
};

const sliceComponentName = () => {

  let component =  getComponentName().replace(/\s/g,'').trim().split('/')
  
  return component[component.length-1]
 }

const getName = (lastUrl) => {
  let urlArr = lastUrl.split("/");
  let componentArr = "";
  if (urlArr[1] !== "") {

    for (let i = 1; i < urlArr.length; i++) {
      let url = urlArr[i];
      componentArr += " / " + url[0].toUpperCase() + "" + url.slice(1);
    }
  }
  return componentArr;
};

module.exports = {
  addScripts,
  getData,
  postData,
  getComponentName,
  sliceComponentName
};
