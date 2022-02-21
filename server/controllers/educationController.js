const Education = require("../models/education");

/**
 * Display all.
 * @param {Object} req for getting all.
 * @param {Object} res
 */
const education_index = (req, res) => {
  Education.find()
    .sort({ createdAt: -1 })

    .then((result) => {
      res.json({ data: result });
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * Display single education details.
 * @param {Object} req for getting single.
 * @param {Object} res
 */
const education_details = (req, res) => {
  const id = req.params.id;
  console.log(id);
  Education.findById(id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(404).render("404", { title: "Not Found" });
    });
};

/**
 * Save the education to databse and save image to "uploads" folder.
 * @param {Object} req education save request.
 * @param {Object} res
 */
const education_create_post = (req, res) => {
  const education = new Education({
    ...req.body,
  });
  education
    .save()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
        res.json(err);
    });
};

/**
 * Uplate the education to databse and save image to "uploads" folder.
 * @param {Object} req education save request.
 * @param {Object} res
 */
const education_update_post = (req, res) => {
  const id = req.params.id;
console.log(req.params.id)
  Education.findOneAndUpdate(
    {
      _id: id,
    },
    {
      $set:  req.body
    },
    {
      new: true,
    },
    (err, post) => {
      if (!err) {
        res.json(post);
      } else {
        console.log(err);
      }
    }
  );
};

module.exports = {
  education_index,
  education_details,
  education_create_post,
  education_update_post,
};
