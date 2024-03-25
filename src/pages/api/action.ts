import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
import crypto from "crypto"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

const s3Client = new S3Client({
    region: 'ap-south-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
})



// comment out the import and use this for edge functions
// const generateFileName = (bytes = 32) => {
//   const array = new Uint8Array(bytes)
//   crypto.getRandomValues(array)
//   return [...array].map((b) => b.toString(16).padStart(2, "0")).join("")
// }


const allowedFileTypes = [
    "image/jpeg",
    "image/png",
]

const maxFileSize = 1048576 * 10 // 1 MB

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex")

type SignedURLResponse = Promise<
    | { failure?: undefined; success: { url: string } }
    | { failure: string; success?: undefined }
>

type GetSignedURLParams = {
    fileType: string
    fileSize: number
    checksum: string
    clerkId: string
}
export const getSignedURL = async ({
    fileType,
    fileSize,
    checksum,
    clerkId
}: GetSignedURLParams): SignedURLResponse => {

    if (!clerkId) {
        return { failure: "not authenticated" }
    }

    if (!allowedFileTypes.includes(fileType)) {
        return { failure: "File type not allowed" }
    }

    if (fileSize > maxFileSize) {
        return { failure: "File size too large" }
    }

    const fileName = generateFileName()

    const putObjectCommand = new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: fileName,
        ContentType: fileType,
        ContentLength: fileSize,
        ChecksumSHA256: checksum,
    })

    const url = await getSignedUrl(
        s3Client,
        putObjectCommand,
        { expiresIn: 60 } // 60 seconds
    )

    console.log({ success: url })

    
    return { success: { url} }
}