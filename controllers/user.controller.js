const user = require("../schemas/user.schema.js");

const getAllUsers = async (req, res,next) => {
  try {
    const users = await user.find();
    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};

module.exports = {
  getAllUsers,
};
