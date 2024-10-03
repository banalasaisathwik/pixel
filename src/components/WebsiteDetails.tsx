import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { api } from "../utils/api";
import { useRouter } from "next/router";
import Image from "next/image";

interface StandardDropzoneProps {
    success: boolean;
    existingDetails?: {
        websiteName: string;
        description: string;
        tagline: string;
        websiteURL: string;
        imageUrl: string;
    };
}

const StandardDropzone: React.FC<StandardDropzoneProps> = ({ success, existingDetails }) => {
    const [presignedUrl, setPresignedUrl] = useState("");
    const [, setFile] = useState<File | null>(null)

    const [websiteName, setWebsiteName] = useState(existingDetails?.websiteName ?? '');
    const [description, setDescription] = useState(existingDetails?.description ?? '');
    const [tagline, setTagline] = useState(existingDetails?.tagline ?? '');
    const [websiteURL, setWebsiteURL] = useState(existingDetails?.websiteURL ?? '');
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(existingDetails?.imageUrl ?? null);
    const router = useRouter();

    console.log("success", success)
    const { mutateAsync: fetchPresignedUrls } = api.s3.getStandardUploadPresignedUrl.useMutation();
    const details = api.details.insert.useMutation({
        onSuccess: () => {
            // Show a success toast
            toast.success("Details inserted successfully");

            // Enable the button and redirect after a delay
            setTimeout(() => {
                setBtnDisabled(false);
                void router.push('/buyer/home');
            }, 3000); // Delay for 3 seconds before redirecting
        },
        onError: (error) => {
            // Handle error
            console.error('Error while inserting details:', error);
            toast.error("Failed to insert details");
        }
    });

    const generateRandomString = (byteLength = 32) => {
        // Generate a Uint8Array of byteLength random bytes
        const randomBytes = window.crypto.getRandomValues(new Uint8Array(byteLength));
        // Convert it to a hex string
        const randomHex = Array.from(randomBytes)
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
        return randomHex;
    };

    const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({
        maxFiles: 1,
        maxSize: 5 * 2 ** 30, // roughly 5GB
        multiple: false,
        onDropAccepted: (files, _event) => {
            const file = files[0] ?? null;
            setFile(file);
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
            if (file) {
                const url = URL.createObjectURL(file);
                setPreviewUrl(url);
            } else {
                setPreviewUrl(null);
            }

            fetchPresignedUrls({ key: generateRandomString() })
                .then(url => {
                    setPresignedUrl(url);
                })
                .catch(err => {
                    console.error(err);
                    toast.error("Failed to fetch presigned URL");
                });
        },
    });

    const handleSubmit = useCallback(async () => {
        if (acceptedFiles.length > 0 && presignedUrl !== "") {
            const file = acceptedFiles[0];
            if (file) {
                try {
                    // Upload the file to the presigned URL
                    await axios.put(presignedUrl, file, {
                        headers: { "Content-Type": file.type },
                    });

                    const imageurl = presignedUrl.split("?")[0] ?? "";
                    details.mutate({ websiteName, description, tagline, websiteURL, imageUrl: imageurl });

                    console.log("Successfully uploaded ", file.name);
                    toast.success("File uploaded successfully");
                } catch (err) {
                    console.error("Error:", err);
                    toast.error("Failed to upload file");
                }
            }
        } else {
            details.mutate({ websiteName, description, tagline, websiteURL, imageUrl: existingDetails?.imageUrl ?? "" });
        }
    }, [acceptedFiles, presignedUrl, websiteName, description, tagline, websiteURL, details, existingDetails?.imageUrl]);

    return (
        <section className="w-full max-w-2xl mt-12 mx-auto p-10 border rounded-lg shadow-lg">
            <ToastContainer />

            {/* Input for website name */}
            <div className="mb-4">
                <label htmlFor="websiteName" className="block text-white text-lg text-left my-4 font-semibold mb-2">Website Name</label>
                <input type="text" id="websiteName" value={websiteName} onChange={(e) => setWebsiteName(e.target.value)} className="w-full border rounded-md px-3 py-2" required />
            </div>
            {/* Input for description */}
            <div className="mb-4">
                <label htmlFor="description" className="block text-white text-lg text-left my-4 font-semibold mb-2">Description</label>
                <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border rounded-md px-3 py-2" rows={4} required></textarea>
            </div>
            {/* Input for tagline */}
            <div className="mb-4">
                <label htmlFor="tagline" className="block text-white text-lg text-left my-4 font-semibold mb-2">Tagline</label>
                <input type="text" id="tagline" value={tagline} onChange={(e) => setTagline(e.target.value)} className="w-full border rounded-md px-3 py-2" required />
            </div>

            {!success && (
                <div>
                    <label htmlFor="image" className="block text-white text-lg text-left my-4 font-semibold mb-2">Image</label>
                    <div {...getRootProps()} className="dropzone-container text-white border-2 border-dashed rounded-lg p-10 mb-4">
                        <input {...getInputProps({ accept: "image/*" })} />
                        {isDragActive ? (
                            <p className="text-center">Drop the file here...</p>
                        ) : (
                            <p className="text-center">Drag n drop file here, or click to select files</p>
                        )}
                        {/* Preview section */}
                        {previewUrl && (
                            <div className="mt-4">
                                <Image src={previewUrl} height={100} width={100} alt="Selected file" className="max-w-full h-auto" />
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Input for website URL */}
            <div className="mb-4">
                <label htmlFor="websiteURL" className="block text-lg text-left text-white my-4 font-semibold mb-2">Website URL</label>
                <input type="url" id="websiteURL" value={websiteURL} onChange={(e) => setWebsiteURL(e.target.value)} className="w-full border rounded-md px-3 py-2" required />
            </div>
            {/* Button to trigger file upload */}
            <button
                onClick={handleSubmit}
                disabled={(!presignedUrl && !success) || btnDisabled}
                className="submit-button bg-black hover:bg-gray-700 text-white font-bold p-4 text-xl w-full mt-4 rounded"
            >
                {success ? "Update Details" : "Upload"}
            </button>
        </section>
    );
};

export default StandardDropzone;
