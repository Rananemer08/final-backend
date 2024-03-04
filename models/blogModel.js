import mongoose from "mongoose";

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true["Please add a title"],
    },

    text: {
      type: String,
      required: true["Please add a text"],
    },

    image: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;