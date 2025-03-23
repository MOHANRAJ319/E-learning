const { s3 } = require('../config/aws.config');

const s3Utils = {
  getSignedUrl: async (key) => {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Expires: 3600 // URL expires in 1 hour
    };
    
    return new Promise((resolve, reject) => {
      s3.getSignedUrl('getObject', params, (err, url) => {
        if (err) reject(err);
        resolve(url);
      });
    });
  },

  deleteFile: async (key) => {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key
    };

    return new Promise((resolve, reject) => {
      s3.deleteObject(params, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  }
};

module.exports = s3Utils;