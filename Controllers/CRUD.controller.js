import { Article } from "../Models/Article.model.js";
import { uploadFileOnCloudinary } from "../Utils/cloudinary.js";
// Create operation
export const createArticle = async (req, res) => {
  try {
    const { title, subtitle, description, author, location } = req.body

    if (!title || !subtitle || !author || !description) {
      return res.status(400).json({ error: "Title, Description, and Author are required fields." });
    }
 
    const imageLocalPath = req.file?.path;
    if (!imageLocalPath) {
      return res.status(400).json({ error: "Resume file is required" });
    }

    const image = await uploadFileOnCloudinary(imageLocalPath);

    const newArticle = new Article({
      title,
      subtitle,
      description,
      author,
      location,
      image
    })

    await newArticle.save()

    res.status(200).json({
      message: "Article successfully created",
      articleId: Article._id,
      title,
      subtitle,
      description,
      author,
      location,
      image
    })
  } catch (error) {
    res.status(500).json({ "Error in creating article": error.message });
  }
}

// Read operation ---> read all articles
export const getArticles = async (req, res) => {
  try {
    const articles = await Article.find()
    res.status(200).json(articles)
  } catch (error) {
    res.status(500).json({ "Error in getting article data": error.message });
  }
}

// Get all articles by getbyId 
export const getArticlesbyId = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id)
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Update articles

export const updateArticles = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.body)
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Delete article

export const deleteArticles = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.body)
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.json({ message: "Article deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

