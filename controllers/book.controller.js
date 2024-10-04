const book = require("../schemas/book.schema.js");
const CustomErrorHandler = require("../utils/CustomErrorHandler.js");
const findBookByNameOrTerm = async (req, res, next) => {
  try {
    const { book_name } = req.query;
    if (book_name.length === 0) {
      throw new CustomErrorHandler(400, "Book Name Is Required");
    }
    const books = await book.aggregate([
      {
        $search: {
          index: "bookName",
          text: {
            query: book_name,
            path: {
              wildcard: "*",
            },
          },
        },
      },
    ]);
    return res.status(200).json({
      success: true,
      message: "Books fetched successfully",
      data: books,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
const findBookByPriceRange = async (req, res, next) => {
  try {
    const { min_price, max_price } = req.query;
    if (!(min_price && max_price)) {
      throw new CustomErrorHandler(400, "Min Price and Max Price Is Required");
    }
    const books = await book.find({
      $and: [
        { book_rent_per_day: { $gte: min_price * 1 } },
        { book_rent_per_day: { $lte: max_price * 1 } },
      ],
    });
    return res.status(200).json({
      success: true,
      message: "Books fetched successfully",
      data: books,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
const findBookByPriceRangeCategoryName = async (req, res, next) => {
  try {
    const { book_name, book_category, min_price, max_price } = req.query;
    if (!(min_price && max_price)) {
      throw new CustomErrorHandler(400, "Min Price and Max Price Is Required");
    }
    if (!book_name || book_name.length < 0) {
      throw new CustomErrorHandler(400, "Book Name Is Required");
    }
    if (!book_category || book_category.length < 0) {
      throw new CustomErrorHandler(400, "Book Category Is Required");
    }
    const books = await book.aggregate([
      {
        $search: {
          index: "bookName",
          text: {
            query: book_name,
            path: {
              wildcard: "*",
            },
          },
        },
      },
      {
        $match: {
          book_category: book_category,
        },
      },
      {
        $match: {
          book_rent_per_day: {
            $gt: min_price * 1,
            $lt: max_price * 1,
          },
        },
      },
    ]);
    return res.status(200).json({
      success: true,
      message: "Books fetched successfully",
      data: books,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
const getAllBooks = async (req, res, next) => {
  try {
    const books = await book.find();
    return res.status(200).json({
      success: true,
      message: "Books fetched successfully",
      data: books,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  findBookByNameOrTerm,
  findBookByPriceRange,
  findBookByPriceRangeCategoryName,
  getAllBooks,
};
