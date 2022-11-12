import {
  S3Client,
  PutObjectCommand,
  ListBucketsCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";

import { requiredServerEnv } from "~/utils/helpers.server";

const S3_DOMAIN = requiredServerEnv("S3_DOMAIN");
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

export const userPrefix = (userId: string, trailingSlash = false) => {
  let prefix = "u/" + userId;
  if (trailingSlash === true) {
    prefix += "/";
  }

  return prefix;
};

export const getBucket = async () => {
  return await s3.send(new ListBucketsCommand({ Bucket: S3_BUCKET }));
};

export const getUserObjects = async (userId: string) => {
  const output = await s3.send(
    new ListObjectsV2Command({
      Bucket: S3_BUCKET,
      Prefix: userPrefix(userId),
    }),
  );

  const files = output.Contents?.map((o) => ({
    url: S3_DOMAIN + "/" + o.Key,
    key: o.Key,
    size: o.Size,
    lastModified: o.LastModified,
  }));

  return files ?? [];
};

export const uploadToBucket = async (data: Buffer, key: string) => {
  const publicUrl = S3_DOMAIN + "/" + key;
  const output = await s3.send(
    new PutObjectCommand({
      Bucket: S3_BUCKET,
      Key: key,
      Body: data,
    }),
  );

  return [publicUrl, output] as const;
};

export const userUploadToBucket = async (userId: string, data: Buffer, filename: string) => {
  const publicUrl = S3_DOMAIN + "/" + filename;
  const key = userPrefix(userId) + "/" + filename;

  const output = await s3.send(
    new PutObjectCommand({
      Bucket: S3_BUCKET,
      Key: key,
      Body: data,
    }),
  );

  return [publicUrl, output] as const;
};
