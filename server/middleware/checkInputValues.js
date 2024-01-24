const checkInputValues = (req, res, next) => {
  try {
    let title = req.body.title;
    let price = req.body.price;
    let description = req.body.description;
    let category = req.body.category
    let image = req.body.image;

    if(!title && !price && !description && !category && !image){
      throw new Error("Cannot be empty fields");
    } else {
      next();
    }

  } catch (error){
    next(error)
  }
}
module.exports = checkInputValues;
