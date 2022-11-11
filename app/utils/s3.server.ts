import { S3Client, PutObjectCommand, ListBucketsCommand } from "@aws-sdk/client-s3";

import { requiredServerEnv } from "~/utils/helpers.server";

const S3_BUCKET = requiredServerEnv("S3_BUCKET");
const S3_ENDPOINT = requiredServerEnv("S3_ENDPOINT");
const S3_REGION = requiredServerEnv("S3_REGION");
const S3_ACCESS_KEY = requiredServerEnv("S3_ACCESS_KEY");
const S3_SECRET_ACCESS_KEY = requiredServerEnv("S3_SECRET_ACCESS_KEY");

const s3 = new S3Client({
  endpoint: S3_ENDPOINT,
  region: S3_REGION,
  forcePathStyle: true,
  apiVersion: "latest",
  credentials: {
    accessKeyId: S3_ACCESS_KEY,
    secretAccessKey: S3_SECRET_ACCESS_KEY,
  },
});

export const getBucket = async () => {
  return await s3.send(new ListBucketsCommand({ Bucket: S3_BUCKET }));
};

export const uploadToBucket = async (data: Buffer, filename: string) => {
  return await s3.send(
    new PutObjectCommand({
      Bucket: S3_BUCKET,
      Key: filename,
      Body: data,
    }),
  );
};
