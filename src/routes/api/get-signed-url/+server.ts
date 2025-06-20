import { PutObjectCommand } from "@aws-sdk/client-s3";
import { json, type RequestEvent } from "@sveltejs/kit";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import awsClient from "@/server/aws-client";


export async function POST(requestEvent : RequestEvent) {

  const { request } = requestEvent;
  const { fileName, contentType, userId } = await request.json();

  const key = `${userId}/${fileName}`;

  const command = new PutObjectCommand({
    Bucket : 'kloude-users',
    Key : key,
    ContentType : contentType
  })

  const uploadUrl = await getSignedUrl(awsClient, command, { expiresIn : 3600 });

  return json({ uploadUrl }, { status : 201 })
}