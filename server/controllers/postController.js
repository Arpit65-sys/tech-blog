import Post from "../models/postModel.js";

export const createPost = async (req, res) => {
  const { title, content, category } = req.body;

  try {
    await Post.createPost(req.user.id, title, content, category);
    res.json({ message: "Post created successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const [posts] = await Post.getAllPosts();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    const [post] = await Post.getPostById(req.params.id);
    if (!post.length)
      return res.status(404).json({ message: "Post not found" });

    res.json(post[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updatePost = async (req, res) => {
  const { title, content } = req.body;

  try {
    await Post.updatePost(req.params.id, title, content);
    res.json({ message: "Post updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    await Post.softDeletePost(req.params.id);
    res.json({ message: "Post deleted (soft)" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getPostsByCategory = async (req, res) => {
  try {
    const categorySlug = req.params.categorySlug;
    const [posts] = await Post.getPostsByCategorySlug(categorySlug);
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};