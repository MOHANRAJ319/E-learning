const AWS = require('aws-sdk');

const cloudfront = new AWS.CloudFront.Signer(
  process.env.CLOUDFRONT_KEY_PAIR_ID,
  process.env.CLOUDFRONT_PRIVATE_KEY
);

const getSignedUrl = (key) => {
  const cfUrl = `${process.env.CLOUDFRONT_DOMAIN}/${key}`;
  const signedUrl = cloudfront.getSignedUrl({
    url: cfUrl,
    expires: Math.floor((Date.now() + 60 * 60 * 1000) / 1000) // 1 hour from now
  });
  return signedUrl;
};

module.exports = { getSignedUrl };