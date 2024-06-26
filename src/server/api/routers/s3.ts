import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { env } from "process";

export const s3Router = createTRPCRouter({
        getStandardUploadPresignedUrl: publicProcedure
        .input(z.object({ key: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const { key } = input;
            const { s3Client:s3 } = ctx;

            const putObjectCommand = new PutObjectCommand({
                Bucket: env.LOCAL_AWS_BUCKET_NAME,
                Key: key,
            });

            return await getSignedUrl(s3, putObjectCommand);
        }),

});