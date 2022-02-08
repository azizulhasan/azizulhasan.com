/**
 * Post data method.
 * @param {url} url api url
 * @param {method} method request type
 * @param {cors} cors 
 * @param {data} data 
 * @returns 
 */
  async function postData(url = "",method = "GET", cors = "no-cors" ,  data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: method, // *GET, POST, PUT, DELETE, etc.
      mode: cors, // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: data, // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }


  /**
 * Post data method.
 * @param {url} url api url
 * @param {method} method request type
 * @param {cors} cors 
 * @param {data} data 
 * @returns 
 */
   async function getData(url = "",method = "GET", cors = "no-cors" ) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: method, // *GET, POST, PUT, DELETE, etc.
      mode: cors, // no-cors, *cors, same-origin
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.json(); // parses JSON response into native JavaScript objects
  }


  module.exports = {
    getData, postData
  }  
