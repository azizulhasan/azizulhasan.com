import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 *
 * utilities
 */
import {
  postWithoutImage,
  setCookie,
  getCookie,
  eraseCookie,
  addScripts,
  getLocation
} from "../../Context/utilities";
import "./assets/css/login.css";

export default function Login() {
  const navigate = useNavigate();
  // const loginToDashboard = (id) => {
  //   navigate("/dashboard");
  //   window.location.reload(false);
  // };

  // addScripts(["https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&callback=initMap&v=weekly&channel=2"])
  // addScripts(["https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg"])

  useEffect(()=>{

  })
  const handleSubmit = (e) => {
    e.preventDefault();

    /**
     * Get full form data and modify them for saving to database.
     */

    let form = new FormData(e.target);
    let data = {};
    for (let [key, value] of form.entries()) {
      if (key === "" || value === "") {
        alert("Please fill the value of : " + key);
        return;
      }

      data[key] = value;
    }

    console.log(data);

    // return;

    postWithoutImage(process.env.REACT_APP_API_URL + "/api/login", {
      email: data.email,
      password: data.password,
    })
      .then((res) => {
        if (res.data === true) {
          /**
           * if remember me is clicked. set set localStorage.
           * which by default store data with no expiration untill crean by
           * javscript or clearing the Browser cache / Locally Stored Data.
           */
          if (data.remember_me !== undefined) {
            window.localStorage.setItem("email", data.email);
            window.localStorage.setItem("password", data.password);

            /**
             * Just for a while.
             */
            window.sessionStorage.setItem("email", data.email);
            window.sessionStorage.setItem("password", data.password);
          } else {
            /**
             * 1. Stores data only for a session, meaning that the data is stored until the browser (or tab) is closed.
             * 2. Data is never transferred to the server.
             * 3. Storage limit is larger than a cookie (at most 5MB).
             */
            window.sessionStorage.setItem("email", data.email);
            window.sessionStorage.setItem("password", data.password);
          }

          // navigate("/dashboard");
          // window.location.reload(false);
        } else {
          alert("Email or password is wrong.");
        }

        var obj = window.navigator;
        getLocation(obj)
        // let keys = Object.methods(obj)
        //   console.log(keys)
        let myNav = ['vendorSub', 'productSub', 'vendor', 'doNotTrack', 'appCodeName', 'appName', 'appVersion', 'platform', 'product', 'userAgent', 'language'];
        // for (var key in obj) {
        //   if (typeof obj[key] == "string") {
        //     console.log(key + " = " + obj[key]);
        //     myNav.push(key);
        //   }
        // }

//         Latitude: 23.7730479
// Longitude: 90.3639587
// Longitude: undefined
        // console.log(myNav);
        // do
        //   Object.getOwnPropertyNames(obj).forEach(function (name) {
        //     console.log(name);
        //   });
        // while ((obj = Object.getPrototypeOf(obj)));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="container">
      {/* <!-- Outer Row --> */}
      <div className="row justify-content-center">
        <div className="col-xl-10 col-lg-12 col-md-9">
          <div className="card o-hidden border-0 shadow-lg my-5">
            <div className="card-body p-0">
              {/* <!-- Nested Row within Card Body --> */}
              <div className="row">
                <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                <div className="col-lg-6">
                  <div className="p-5">
                    <div className="text-center">
                      <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                    </div>
                    <form onSubmit={handleSubmit} className="user">
                      <div className="form-group">
                        <input
                          type="email"
                          name="email"
                          value="azizulhasan.cr@gmail.com"
                          className="form-control form-control-user"
                          id="exampleInputEmail"
                          aria-describedby="emailHelp"
                          placeholder="Enter Email Address..."
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="password"
                          name="password"
                          value="azizulhasan.cr@gmail.com"
                          className="form-control form-control-user"
                          id="exampleInputPassword"
                          placeholder="Password"
                        />
                      </div>
                      <div className="form-group my-2">
                        <div className="custom-control custom-checkbox small">
                          <input
                            type="checkbox"
                            name="remember_me"
                            className="custom-control-input"
                            id="customCheck"
                          />
                          <label
                            className="custom-control-label"
                            htmlFor="customCheck"
                          >
                            Remember Me
                          </label>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="btn btn-primary btn-user w-100"
                      >
                        Login
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
