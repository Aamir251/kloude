import { S3Client } from "@aws-sdk/client-s3";
import { SCW_ACCESS_KEY, SCW_SECRET_KEY, SCW_REGION } from '$env/static/private'

const awsClient = new S3Client({
  endpoint : `https://s3.${SCW_REGION}.scw.cloud`,
  region : SCW_REGION,
  credentials : {
    accessKeyId : SCW_ACCESS_KEY,
    secretAccessKey : SCW_SECRET_KEY
  }
})

export default awsClient