import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    shortDesc: { type: String, required: true, trim: true, maxlength: 300 },
    longDesc: { type: String, required: true, trim: true, maxlength: 8000 },
    tags: { type: [String] },
    images: { type: [String] },
    live: { type: String, default: "" },
    source: { type: String, default: "" },
  },
  { timestamps: true }
);

// Useful indexes
ProjectSchema.index({ title: "text", shortDesc: "text", longDesc: "text" });
ProjectSchema.index({ updatedAt: -1 });

export default mongoose.models.Project ||
  mongoose.model("Project", ProjectSchema);
