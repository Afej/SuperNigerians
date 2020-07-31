const User = require("../models/user");
const { renderPage } = require("../utils/render-page");
const Comment = require("../models/comment");
const Post = require("../models/post");

exports.getUserDetails = async (req, res) => {
  if (!req.session.user) {
    res.redirect("/");
  }
  const user = await User.findOne({ _id: req.session.user._id });
  const userComments = await Comment.find({ creator: user._id });
  const userPosts = await Post.find({ creator: user._id });
  const data = {
    user,
    userComments,
    userPosts,
  };
  renderPage(res, "pages/userDashboard", data, "User Dashboard");
};
