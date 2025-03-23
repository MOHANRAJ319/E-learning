const router = require('express').Router();
const Course = require('../models/course.model');
const upload = require('../middleware/upload');
const s3Utils = require('../utils/s3Utils');
const { getSignedUrl } = require('../config/cloudfront.config');

// Get all courses
router.route('/').get((req, res) => {
  Course.find()
    .then(async (courses) => {
      // Get signed URLs for course images
      const coursesWithUrls = await Promise.all(courses.map(async (course) => {
        const courseObj = course.toObject();
        if (courseObj.cloudStorageDetails?.courseImageKey) {
          courseObj.image = await s3Utils.getSignedUrl(courseObj.cloudStorageDetails.courseImageKey);
        }
        return courseObj;
      }));
      res.json(coursesWithUrls);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get course with video streaming URL
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    const courseObj = course.toObject();

    // Generate signed URLs for course content
    if (courseObj.cloudStorageDetails) {
      // Get image URL
      if (courseObj.cloudStorageDetails.courseImageKey) {
        courseObj.image = await s3Utils.getSignedUrl(courseObj.cloudStorageDetails.courseImageKey);
      }

      // Get video streaming URLs
      courseObj.modules = await Promise.all(courseObj.modules.map(async (module) => {
        const updatedLessons = await Promise.all(module.lessons.map(async (lesson) => {
          if (lesson.videoUrl) {
            const videoKey = courseObj.cloudStorageDetails.videoKeys.find(
              key => key.includes(lesson.videoUrl)
            );
            if (videoKey) {
              lesson.streamingUrl = getSignedUrl(videoKey);
            }
          }
          return lesson;
        }));
        return { ...module, lessons: updatedLessons };
      }));
    }

    res.json(courseObj);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

// Add new course with image and materials
router.post('/add', upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'materials', maxCount: 5 },
  { name: 'videos', maxCount: 10 }
]), async (req, res) => {
  try {
    const courseData = JSON.parse(req.body.courseData);
    const files = req.files;

    // Store file keys
    const cloudStorageDetails = {
      courseImageKey: files.image?.[0]?.key,
      materialKeys: files.materials?.map(file => file.key) || [],
      videoKeys: files.videos?.map(file => file.key) || []
    };

    const newCourse = new Course({
      ...courseData,
      image: await s3Utils.getSignedUrl(cloudStorageDetails.courseImageKey),
      cloudStorageDetails
    });

    await newCourse.save();
    res.json('Course added successfully!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

module.exports = router;