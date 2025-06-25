import { SCW_BUCKET_NAME } from "$env/static/private";
import awsClient from "@/server/aws-client";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { json, type RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async ({ url }) => {

  const userId = url.searchParams.get('userId');
  const fileName = url.searchParams.get('fileName');
  const key = `${userId}/${fileName}`;

  if (!userId || !fileName) {
    return json({ message : "Details Not provided" }, { status : 404 })
  }

  const command = new GetObjectCommand({
    Bucket: SCW_BUCKET_NAME,
    Key: key,
  })

  const downloadUrl = await getSignedUrl(awsClient, command, { expiresIn: });

  return json({ downloadUrl }, { status: 200 })
}