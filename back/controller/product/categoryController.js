const Category = require("../../model/product/category");


exports.createCategory = async (req, res) => {
  try {
    const { category, description, responsable } = req.body;

    if (!category || !responsable) {
      return res.status(400).send({ error: "Category and responsable are required" });
    }

    const existingCategory = await Category.findOne({ category });
    if (existingCategory) {
      return res.status(400).send({ error: "Category already exists" });
    }

    const newCategory = new Category({
      category,
      description, 
      responsable,
    });

    await newCategory.save();
    return res.status(201).send({ message: "Category created successfully", category: newCategory });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};


exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).send(categories);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
}

exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      return res.status(404).send({ error: "Category not found" });
    }

    return res.status(200).send(category);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { category, description, responsable } = req.body;

    if (!category || !responsable) {
      return res.status(400).send({ error: "Category and responsable are required" });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { category, description, responsable, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      return res.status(404).send({ error: "Category not found" });
    }

    return res.status(200).send({ message: "Category updated successfully", category: updatedCategory });
  } catch (error) {
    if (error.code === 11000) { 
      return res.status(400).send({ error: "Category already exists" });
    }
    return res.status(500).send({ error: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).send({ error: "Category not found" });
    }

    return res.status(200).send({ message: "Category deleted successfully" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

