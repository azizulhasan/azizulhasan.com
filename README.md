# Mern Stack Portfolio.

Build your portfolio website with Mongodb, Express, React and NodeJs.

# How to start ?
1. Clone the repo to your local derectory.
2. `cd local_dir` then install dependency for `server`
3. `cd client` install dependency for the client. 
4. Create 2 `.env` file for envirement variable. 
5. First one in the root directory and second one in the client derectory.

    a. In the root directory add these `env` variables.
        
        i. DB_URL=your_db_url
        ii. PORT=4000
        iii. UPLOAD_FOLDER_URL=http://localhost:4000/server/uploads
        iv. UPLOAD_FOLDER=server/uploads
        v. NODE_ENV=development
    
    a. In the `client` directory add these `env` variables.
        
        i. REACT_APP_API_URL=http://localhost:4000
        ii. REACT_APP_URL=http://localhost:3000
        iii. REACT_APP_WEBSITE_NAME=app_name

6. After adding these variable properly now your app is ready for developement. run `npm run dev` from root directory.

7. For deploying to heroku create an app

8. ![Portfolio](https://woocommerce.com/wp-content/uploads/2012/01/2016-02-17-at-09.57.png?w=950)
9. ![dashboard](https://woocommerce.com/wp-content/uploads/2012/01/2016-02-17-at-09.57.png?w=950)