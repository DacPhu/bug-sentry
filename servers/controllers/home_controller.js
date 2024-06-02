"use strict";

const controller = {};
const Sequelize = require("sequelize");
// const models = require("../models");

const querystring = require("querystring");

// controller.showData = async (req, res) => {
//   const Category = models.Category;
//   const Tag = models.Tag;
//   const Blog = models.Blog;
//   const Comment = models.Comment;

//   const tagsPromise = Tag.findAll();
//   const categoryPromise = Blog.findAll({
//     attributes: [
//       [Sequelize.col("Category.id"), "categoryId"],
//       [Sequelize.col("Category.name"), "categoryName"],
//       [Sequelize.fn("COUNT", Sequelize.col("*")), "count"],
//     ],
//     include: [
//       {
//         model: Category,
//         attributes: [],
//       },
//     ],
//     group: ["Category.id", "Category.name"],
//     raw: true,
//   });

//   // const blogsPromise = Blog.findAll({
//   //   attributes: [
//   //     "id",
//   //     "title",
//   //     "createdAt",
//   //     "summary",
//   //     "imagePath",
//   //     "categoryId",
//   //     [Sequelize.fn("COUNT", Sequelize.col("*")), "commentCount"],
//   //   ],
//   //   include: [
//   //     {
//   //       model: Comment,
//   //       attributes: [],
//   //     },
//   //   ],
//   //   group: ["Blog.id"],
//   //   raw: true,
//   // });

//   const blogsPromise = Blog.findAll({
//     include: [
//       {
//         model: Tag,
//         through: "BlogTag",
//       },
//       {
//         model: Comment,
//       },
//     ],
//   });

//   try {
//     const [categories, allTags, blogs] = await Promise.all([
//       categoryPromise,
//       tagsPromise,
//       blogsPromise,
//     ]);

//     let category = isNaN(req.query.category) ? 0 : parseInt(req.query.category);
//     let tag = isNaN(req.query.tag) ? 0 : parseInt(req.query.tag);
//     let keyword = req.query.keyword || "";

//     let page = isNaN(req.query.page) ? 1 : parseInt(req.query.page);

//     let filter_blogs = blogs;

//     if (category > 0) {
//       filter_blogs = filter_blogs.filter((item) => item.categoryId == category);
//     }

//     if (tag > 0) {
//       filter_blogs = filter_blogs.filter((item) =>
//         item.Tags.map((tag) => tag.id).includes(tag)
//       );
//     }

//     if (keyword.trim() != "") {
//       filter_blogs = filter_blogs.filter((item) =>
//         item.title.toLowerCase().includes(keyword.toLowerCase())
//       );
//     }

//     let limit = 6;
//     let startIndex = (page - 1) * limit;
//     let endIndex = page * limit;
//     let num_pages = Math.ceil((1.0 * filter_blogs.length) / limit);
//     filter_blogs = filter_blogs.slice(startIndex, endIndex);

//     res.render("index", {
//       filter_blogs,
//       allTags,
//       categories,
//       num_pages,
//       current_page: page,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Internal Server Error");
//   }
// };

controller.showHomePage = (req, res) => {
  res.render("home", { layout: "home_layout" });
};

module.exports = controller;
