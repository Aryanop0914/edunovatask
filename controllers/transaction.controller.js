const transaction = require("../schemas/transaction.schema.js");
const book = require("../schemas/book.schema.js");
const CustomErrorHandler = require("../utils/CustomErrorHandler.js");
const { isValidObjectId } = require("mongoose");
const updateIssueDate = async (req, res, next) => {
  try {
    const { book_name, user_id, issueDate } = req.body;
    console.log(req.body);
    if (!book_name || book_name.length < 0) {
      throw new CustomErrorHandler(400, "Book Name Is Required");
    }
    if (!isValidObjectId(user_id)) {
      throw new CustomErrorHandler(400, "User Id Is Invalid");
    }
    if (!issueDate) {
      throw new CustomErrorHandler(400, "Issue Date Is Required");
    }
    const issueDateTypeDate = new Date(issueDate);
    const bookInfo = await book.findOne({ book_name: book_name });
    if (!bookInfo) {
      throw new CustomErrorHandler(400, "No Book Found With This Name");
    }
    const transactionRelatedToBook = await transaction.find({
      book_id: bookInfo._id,
    });
    if (transactionRelatedToBook.length === 0) {
      await transaction.create({
        book_id: bookInfo._id,
        user_id: user_id,
        book_issue_date: issueDateTypeDate,
      });
      return res.status(200).json({
        success: true,
        message: "Book Issued Successfully",
        data: { book_name, user_id, issueDate },
      });
    }
    const bookAvailable = transactionRelatedToBook.filter(
      (book) =>
        !(book.book_return_date && book.book_issue_date < book.book_return_date)
    );
    if (bookAvailable.length !== 0) {
      throw new CustomErrorHandler(200, "Book is Not available");
    }
    await transaction.create({
      book_id: bookInfo._id,
      user_id: user_id,
      book_issue_date: issueDateTypeDate,
    });
    return res.status(200).json({
      success: true,
      message: "Book Issued Successfully",
      data: { book_name, user_id, issueDate },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
const updateReturnDate = async (req, res, next) => {
  try {
    const { book_name, user_id, returnDate } = req.body;
    if (!book_name || book_name.length < 0) {
      throw new CustomErrorHandler(400, "Book Name Is Required");
    }
    if (!isValidObjectId(user_id)) {
      throw new CustomErrorHandler(400, "User Id Is Invalid");
    }
    if (!returnDate) {
      throw new CustomErrorHandler(400, "Return Date Is Required");
    }
    const returnDateTypeDate = new Date(returnDate);
    const bookInfo = await book.findOne({ book_name: book_name });
    if (!bookInfo) {
      throw new CustomErrorHandler(400, "No Book Found With This Name");
    }
    const transactionRelatedToBook = await transaction.find({
      book_id: bookInfo._id,
    });
    if (transactionRelatedToBook.length === 0) {
      throw new CustomErrorHandler(400, "No Book Issued With this Name");
    }
    const returnBook = transactionRelatedToBook.filter(
      (book) =>
        book.book_return_date === null &&
        book.user_id.toString() === user_id.toString() &&
        returnDateTypeDate.getTime() - book.book_issue_date.getTime() > 0
    );
    if (returnBook.length === 0) {
      throw new CustomErrorHandler(
        400,
        "No Book Issued With this Name Or Return date might be Wrong"
      );
    }
    const issuedDate = returnBook[0].book_issue_date;
    let timeDifference = returnDateTypeDate.getTime() - issuedDate.getTime();
    let daysDifference = Math.round(timeDifference / (1000 * 60 * 60 * 24));
    await transaction.findOneAndUpdate(
      {
        $and: [{ _id: returnBook[0]._id }, { user_id }],
      },
      {
        book_return_date: returnDateTypeDate,
        revenue_generated: daysDifference * bookInfo.book_rent_per_day,
      }
    );
    return res.status(200).json({
      success: true,
      message: "Book Returned Successfully",
      data: {
        book_name,
        user_id,
        returnDate,
        revenue_generated: daysDifference * bookInfo.book_rent_per_day,
      },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
const getPeopleCountStatusIfNotIssued = async (req, res, next) => {
  try {
    const { book_name } = req.body;
    if (!book_name || book_name.length < 0) {
      throw new CustomErrorHandler(400, "Book Name Is Required");
    }
    const bookInfo = await book.findOne({ book_name: book_name });
    if (!bookInfo) {
      throw new CustomErrorHandler(400, "No Book Found With This Name");
    }
    const transactionRelatedToBook = await transaction.aggregate([
      {
        $match: {
          $expr: {
            $eq: [
              "$book_id",
              {
                $toObjectId: bookInfo._id,
              },
            ],
          },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails",
      },
      {
        $group: {
          _id: "$book_id",
          users_who_issued: {
            $push: {
              user_id: "$userDetails._id",
              name: "$userDetails.name",
              issue_date: "$book_issue_date",
              return_date: "$book_return_date",
            },
          },
          currently_issued_to: {
            $first: {
              $cond: {
                if: {
                  $eq: ["$book_return_date", null],
                },
                then: "$userDetails",
                else: null,
              },
            },
          },
        },
      },
      {
        $addFields: {
          status: {
            $cond: {
              if: {
                $ne: ["$currently_issued_to", null],
              },
              then: "Issued",
              else: "Not Issued",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          book_id: "$_id",
          users_who_issued: 1,
          currently_issued_to: 1,
          status: 1,
        },
      },
    ]);
    if (transactionRelatedToBook.length === 0) {
      throw new CustomErrorHandler(
        400,
        "No Book was Issued in Past with This name"
      );
    }
    return res.status(200).json({
      success: true,
      message: "Total Rent Counted Successfully",
      data: {
        transactionRelatedToBook: transactionRelatedToBook[0],
        total_count: transactionRelatedToBook[0].users_who_issued.length,
      },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
const totalRentGeneratedByBook = async (req, res, next) => {
  try {
    const { book_name } = req.body;
    if (!book_name || book_name.length < 0) {
      throw new CustomErrorHandler(400, "Book Name Is Required");
    }
    const bookInfo = await book.findOne({ book_name });
    if (!bookInfo) {
      throw new CustomErrorHandler(400, "No Book Found With This Name");
    }
    const transactionRelatedToBook = await transaction.find({
      book_id: bookInfo._id,
    });
    let totalRentGenerated = 0;
    transactionRelatedToBook.forEach((book) => {
      if (
        book.book_return_date &&
        book.book_issue_date < book.book_return_date
      ) {
        totalRentGenerated = totalRentGenerated + book.revenue_generated;
      }
    });
    return res.status(200).json({
      success: true,
      message: "Total Rent Counted Successfully",
      data: {
        total_rent_generated: totalRentGenerated,
      },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
const getAllBookIssuedByUser = async (req, res, next) => {
  try {
    const { user_id } = req.body;
    if (!isValidObjectId(user_id)) {
      throw new CustomErrorHandler(400, "User Id Is Invalid");
    }
    const transactionRelatedToUser = await transaction.aggregate([
      {
        $match: {
          $expr: {
            $eq: [
              "$user_id",
              {
                $toObjectId: user_id,
              },
            ],
          },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "book_id",
          foreignField: "_id",
          as: "booksIssued",
        },
      },
      {
        $unwind: {
          path: "$booksIssued",
        },
      },
      {
        $project: {
          booksIssued: 1,
        },
      },
      {
        $replaceRoot: {
          newRoot: "$booksIssued",
        },
      },
    ]);
    return res.status(200).json({
      success: true,
      message: "All Books rented by the user fetched Successfully",
      data: {
        booksIssued: transactionRelatedToUser,
      },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
const getAllBookInDateRange = async (req, res, next) => {
  try {
    const { min_issue_date, max_issue_date } = req.body;
    if (!min_issue_date || !max_issue_date) {
      throw new CustomErrorHandler(400, "Issue Dates are Required");
    }
    const minIssueDate = new Date(min_issue_date);
    const maxIssueDate = new Date(max_issue_date);
    const transactionRelatedToBook = await transaction.aggregate([
      {
        $match: {
          book_issue_date: {
            $gte: minIssueDate,
            $lte: maxIssueDate,
          },
        },
      },
      {
        $lookup: {
          from: "books",
          localField: "book_id",
          foreignField: "_id",
          as: "bookInfo",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      {
        $unwind: {
          path: "$userInfo",
        },
      },
      {
        $unwind: {
          path: "$bookInfo",
        },
      },
      {
        $project: {
          book_issue_date: 1,
          book_return_date: 1,
          revenue_generated: 1,
          bookInfo: 1,
          userInfo: 1,
        },
      },
    ]);
    return res.status(200).json({
      success: true,
      message: "Total Rent Counted Successfully",
      data: {
        booksIssued: transactionRelatedToBook,
      },
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
module.exports = {
  updateIssueDate,
  updateReturnDate,
  getPeopleCountStatusIfNotIssued,
  totalRentGeneratedByBook,
  getAllBookIssuedByUser,
  getAllBookInDateRange,
};
