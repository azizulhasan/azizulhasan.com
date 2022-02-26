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
 * Post data method.
 * @param {url} url api url
 * @param {method} method request type
 * @returns
 */
 const postWithoutImage = async (url = "", data = {}) => {
  // Default options are marked with *
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

/**
 * 
 * @param {coockie_name} name 
 * @param {coockie_value} value 
 * @param {exprires} days 
 */
function setCookie(name,value,days) {
  var expires = "";
  if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days*24*60*60*1000));
      expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

/**
 * 
 * @param {coockie_name} name 
 * @returns 
 */
function getCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}
/**
 * 
 * @param {coockie_name} name 
 */
function eraseCookie(name) {   
  document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}


var errorCallback = function(error){
  var errorMessage = 'Unknown error';
  switch(error.code) {
    case 1:
      errorMessage = 'Permission denied';
      break;
    case 2:
      errorMessage = 'Position unavailable';
      break;
    case 3:
      errorMessage = 'Timeout';
      break;
  }
  console.log(errorMessage);
};

var options = {
  enableHighAccuracy: true,
  timeout: 1000,
  maximumAge: 0
};

function getLocation(navigator) {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(displayLocation,errorCallback,options);
  } else { 
    console.log("Geolocation is not supported by this browser.")
    // x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

  function displayLocation(position){

    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    var request = new XMLHttpRequest();
    console.log(position)
    var method = 'GET';
    var url = 'https://api.bigdatacloud.net/data/reverse-geocode-client?latitude='+latitude+'&longitude='+longitude+'&localityLanguage=en';
    var async = true;

    request.open(method, url, async);
    request.onreadystatechange = function(){
      if(request.readyState == 4 && request.status == 200){
        var data = JSON.parse(request.responseText);
        var address = data.results;
        console.log(JSON.parse(request.responseText));
      }
    };
    request.send();
  };




module.exports = {
  addScripts,
  getData,
  postData,
  getComponentName,
  sliceComponentName,
  postWithoutImage,
  setCookie,
  getCookie,
  eraseCookie,
  getLocation
};
