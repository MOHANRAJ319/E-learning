const multer = require('multer');
const multerS3 = require('multer-s3');
const { s3 } = require('../config/aws.config');

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: 'private',
    metadata: (req, file, cb) => {
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      const fileType = file.mimetype.split('/')[0];
      const timestamp = Date.now().toString();
      cb(null, `${fileType}s/${timestamp}-${file.originalname}`);
    }
  }),
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB limit
  }
});

module.exports = upload;