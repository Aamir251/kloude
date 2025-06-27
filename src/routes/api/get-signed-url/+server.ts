import { PutObjectCommand } from "@aws-sdk/client-s3";
import { json, type RequestEvent } from "@sveltejs/kit";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import awsClient from "@/server/aws-client";
import { SCW_BUCKET_NAME } from "$env/static/private"

export async function POST(requestEvent: RequestEvent) {

  const { request, locals } = requestEvent;
  const { fileName, contentType } = await request.json();

  if (!locals.session?.user.id) {
    return json({ message : 'Unauthorized' }, { status : 400 })
  }

  const key = `${locals.session.user.id}/${fileName}`;

  const command = new PutObjectCommand({
    Bucket: SCW_BUCKET_NAME,
    Key: key,
    ContentType: contentType
  })

  const uploadUrl = await getSignedUrl(awsClient, command, { expiresIn: 3600 });

  return json({ uploadUrl }, { status: 201 })
}