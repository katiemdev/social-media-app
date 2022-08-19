const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Comment = require("../models/Comments");

module.exports = {
	getProfile: async (req, res) => {
		try {
			const posts = await Post.find({ user: req.user.id });
			res.render("profile.ejs", { posts: posts, user: req.user });
			console.log(req.user);
		} catch (err) {
			console.log(err);
		}
	},
	getFeed: async (req, res) => {
		try {
			const posts = await Post.find().sort({ createdAt: "desc" }).lean();
			res.render("feed", { posts: posts, user: req.user });
		} catch (err) {
			console.log(err);
		}
	},
	getPost: async (req, res) => {
		try {
			const post = await Post.findById(req.params.id)
				.lean()
				.populate({ path: "comments", populate: { path: "user" } })
				.populate("user");

			res.render("post.ejs", {
				post: post,
				user: req.user,
			});
		} catch (err) {
			console.log(err);
		}
	},
	createPost: async (req, res) => {
		console.log(req.body);
		try {
			// Upload image to cloudinary
			const result = await cloudinary.uploader.upload(req.file.path);

			await Post.create({
				title: req.body.title,
				image: result.secure_url,
				cloudinaryId: result.public_id,
				caption: req.body.caption,
				comments: [],
				likes: 0,
				user: req.user.id,
			});
			console.log("Post has been added!");
			res.redirect("/feed");
		} catch (err) {
			console.log(err);
		}
	},
	likePost: async (req, res) => {
		try {
			await Post.findOneAndUpdate(
				{ _id: req.params.id },
				{
					$inc: { likes: 1 }, //increase likes property by 1.
				}
			);
			console.log("Likes +1");
			res.redirect("back");
		} catch (err) {
			console.log(err);
		}
	},
	deletePost: async (req, res) => {
		try {
			// Find post by id
			let post = await Post.findById({ _id: req.params.id });
			// Delete image from cloudinary
			await cloudinary.uploader.destroy(post.cloudinaryId);
			// Delete post from db
			await Post.remove({ _id: req.params.id });
			console.log("Deleted Post");
			res.redirect("/feed");
		} catch (err) {
			res.redirect("/profile");
		}
	},
	addComment: async (req, res) => {
		try {
			// INSTANTIATE INSTANCE OF MODEL
			// SAVE INSTANCE OF Comment MODEL TO DB
			const comment = await Comment.create({
				content: req.body.comment,
				user: req.user,
			});
			const post = await Post.findById(req.params.id);
			await post.comments.unshift(comment);
			await post.save();
			console.log("Added Comment");
			await res.redirect("back");
		} catch (err) {
			console.log(err);
		}
	},
	deleteComment: async (req, res) => {
		try {
			const post = await Post.findById({ _id: req.params.postid });
			// Find comment by id
			const comment = await Comment.findById({ _id: req.params.commentid });
			// Delete post from db
			await Comment.remove({ _id: comment });
			await post.comments.pull({ _id: req.params.commentid });
			post.save();
			console.log("Deleted Comment");
			res.redirect("back");
		} catch (err) {
			res.redirect("/feed");
		}
	},
};
