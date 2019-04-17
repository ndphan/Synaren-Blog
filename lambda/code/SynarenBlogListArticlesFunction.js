const AWS = require("aws-sdk");
const s3 = new AWS.S3();

function mapBucketListData(data, prefix) {
  const contents = data.Contents;
  const articles = contents
    .filter(item => item.Key !== prefix 
      && item.Key !== prefix + "/" 
      && item.Size !== 0 
      && item.endsWith('/') !== true
    )
    .map(item => ({
      key: item.Key,
      lastModified: item.LastModified
    }));
  const folders = data.CommonPrefixes.map(folder => {
    return {
      key: folder.Prefix,
      sub: true
    };
  });
  return {
    articles: [...articles, ...folders],
    count: articles.length
  };
}

function buildResponse(code, message) {
  return {
    statusCode: code,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify(message)
  };
}

exports.handler = async _ => {
  const params = {
    Bucket: "synaren-app.com",
    Prefix: 'blog'
  };
  return await s3
    .listObjectsV2(params)
    .promise()
    .then(data => buildResponse(200, mapBucketListData(data, params.Prefix)))
    .catch(_ =>
      buildResponse(500, JSON.stringify({ message: "internal server error" }))
    );
};
