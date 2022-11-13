import type { User } from "@prisma/client";

import {
  S3Client,
  PutObjectCommand,
  ListBucketsCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

import { prisma } from "~/db/prisma.server";
import { requiredServerEnv } from "~/utils/helpers.server";

export const S3_DOMAIN = requiredServerEnv("S3_DOMAIN");
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

interface UserUploadOptions {
  userId: User["id"];
  fileId: string;
  filename: string;
  tags?: string[];
  sha256: string;
  originalSha256: string;
}

export const userUploadToBucket = async (data: Buffer, opts: UserUploadOptions) => {
  const publicUrl = S3_DOMAIN + "/" + opts.filename;
  const key = userPrefix(opts.userId) + "/" + opts.filename;

  const tags =
    opts.tags?.map((value) => ({
      value,
    })) ?? [];

  const output = await s3.send(
    new PutObjectCommand({
      Bucket: S3_BUCKET,
      Key: key,
      Body: data,
    }),
  );

  await prisma.file.create({
    data: {
      id: opts.fileId,
      s3Key: key,
      uploaderId: opts.userId,
      size: Buffer.byteLength(data),
      tag: {
        createMany: {
          data: tags,
        },
      },
      sha256: opts.sha256,
      originalSha256: opts.originalSha256,
    },
  });

  return [publicUrl, output] as const;
};

export const deleteFromBucket = async (...keys: string[]) => {
  const deletedObjects = await Promise.all(
    keys.map((Key) =>
      s3.send(
        new DeleteObjectCommand({
          Bucket: S3_BUCKET,
          Key,
        }),
      ),
    ),
  );

  const query = await prisma.file.deleteMany({
    where: {
      s3Key: {
        in: keys,
      },
    },
  });

  return [deletedObjects, query] as const;
};
