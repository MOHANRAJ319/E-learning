const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new Schema({
  title: { type: String, required: true },
  instructor: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  modules: [{
    title: String,
    lessons: [{
      title: String,
      content: String,
      videoUrl: String,
      materials: [{
        title: String,
        fileUrl: String,
        fileType: String
      }]
    }]
  }],
  level: { type: String, required: true },
  duration: { type: String, required: true },
  cloudStorageDetails: {
    courseImageKey: String,
    materialKeys: [String],
    videoKeys: [String]
  }
}, {
  timestamps: true
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;