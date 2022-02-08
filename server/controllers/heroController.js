const Hero = require('../models/hero');
const multer = require('multer')

/**
 * Display all blogs.
 * @param {Object} req for getting all blogs.
 * @param {Object} res 
 */
const hero_index = (req, res) => {

  Hero.find().sort({ createdAt: -1 })

    .then(result => {
      res.json({ data: result });
    })
    .catch(err => {
      console.log(err);
    });
}

/**
 * Display single blog details.
 * @param {Object} req for getting single.
 * @param {Object} res 
 */
const hero_details = (req, res) => {
//   const id = req.params.id;
//   Hero.findById(id)
//     .then(result => {
      
//       res.json({ data: result });
//     })
//     .catch(err => {
//       res.status(404).render('404', {title:"Not Found"})
//     });
}
/**
 * Store image to "uploads" folder. after modifiying image namge.
 * 
 */
const Storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb) => {
        cb(null, Date.now()+"_"+file.originalname)
    }
})

const uploads = multer({
    storage: Storage
}).single('backgroundImage')

/**
 * Save the blog to databse and save image to "uploads" folder.
 * @param {Object} req blog save request.
 * @param {Object} res 
 */
const hero_create_post = (req, res) => {
    
  uploads(req, res, (err)=> {
      if(err){
          console.log(err)
      }else{
          const hero = new Hero({
              ...req.body, 
              ...{
                  backgroundImage: req.file.filename,
              }
          });
      hero.save()
        .then(result => {
          res.json(result)
        })
        .catch(err => {
          console.log(err);
        });
      }
  })
}

module.exports = {
  hero_index, 
  hero_details, 
  hero_create_post, 
}