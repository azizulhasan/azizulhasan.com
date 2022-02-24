  /**
 * Post data method.
 * @param {url} url api url
 * @param {method} method request type
 * @returns
 */
   const postData = async (url = "", data = {}) => {
    // Default options are marked with *
    console.log(JSON.stringify(data))
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json'
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
     * Add another contact
     */
     const addContact = () => {
      const icon_col = document.getElementById("contact_col");
      const icon_row = document
        .getElementById("contact_col")
        .firstChild.cloneNode(true);
      icon_col.appendChild(icon_row);
    };
  
    /**
     * Delete contact
     */
    const deleteContact = (e) => {
      let row = e.target.parentElement.parentElement;
      e.target.parentElement.parentElement.parentElement.removeChild(row);
    };
    // Create table headers consisting of 4 columns.
    const STORY_HEADERS = [
      {
        prop: "contact_type",
        title: "Contact Type",
      },
      {
        prop: "contact_type_value",
        title: "Contact Value",
      },
      
    ];
    module.exports = {
      STORY_HEADERS,
      deleteContact,
      getData,
      postData,
      addContact
    };
    