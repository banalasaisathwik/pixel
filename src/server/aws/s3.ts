import { S3Client,type S3ClientConfig } from "@aws-sdk/client-s3";
import { env } from "process";

// Ensure environment variables are properly initialized
const region = env.LOCAL_AWS_BUCKET_REGION ?? "default-region";
const accessKeyId = env.LOCAL_AWS_ACCESS_KEY ?? "default-access-key-id";
const secretAccessKey = env.LOCAL_AWS_SECRET_ACCESS_KEY ?? "default-secret-access-key";

const s3ClientConfig: S3ClientConfig = {
    region: region,
    credentials: {
        accessKeyId: accessKeyId,
        secretAccessKey: secretAccessKey,
    },
};

export const s3Client = new S3Client(s3ClientConfig);
