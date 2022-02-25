const Login = require("../models/login");

/**
 * Display all login content.
 * @param {Object} req for getting all login content.
 * @param {Object} res
 */
const login_index = (req, res) => {
  Login.find()
    .sort({ createdAt: -1 })

    .then((result) => {
      res.json({ data: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * Display single login details.
 * @param {Object} req for getting single.
 * @param {Object} res
 */
const login_details = (req, res) => {
  const id = req.params.id;
  console.log(id);
  Login.findById(id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
};

/**
 * Get login data
 * @param {email} email
 * @returns
 */
const get_credentials = (email) => {
  console.log(email);
};

/**
 * login to dashboard.
 * @param {Object} req login save request.
 * @param {Object} res
 */
const login_to_dashboard = (req, res) => {
  //   console.log(req.body)
  // return;
  const logins = new Login({
    ...req.body,
  });
  
  //   logins.save().then((result) => {
  //     console.log(result)
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  Login.find({ email: req.body.email })
    .then((result) => {
      if (
        req.body.email === result[0].email &&
        req.body.password === result[0].password
      ) {
        res.json({ data: true });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * Uplate the login to databse.
 * @param {Object} req login save request.
 * @param {Object} res
 */
const login_update_post = (req, res) => {
  const id = req.params.id;
  Login.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $set: {
        ...req.body,
      },
    },
    {
      new: true,
    },
    (err, login) => {
      if (!err) {
        res.json(login);
      } else {
        console.log(err);
      }
    }
  );
};

module.exports = {
  login_index,
  login_details,
  login_to_dashboard,
  login_update_post,
};
