import AWS from "aws-sdk";
const fs = require("file-system");

const S3 = new AWS.S3({
  accessKeyId: process.env.AMZ_ID,
  secretAccessKey: process.env.AMZ_KEY
});

fs.readFile(this.state.thumbnail, (err, data) => {
  if (err) throw err;
  const params = {
    Bucket: "tcsgo-mediafiles", // pass your bucket name
    Key: this.state.newThumbId + ".jpg", 
    Body: JSON.stringify(this.state.thumbnail, null, 2)
  };

  S3.upload(params, function(s3Err, data) {
    if (s3Err) throw s3Err;
    console.log(`File uploaded successfully at ${data.Location}`);
  });
});
