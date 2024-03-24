import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


import { api } from "../utils/api";
import { useRouter } from "next/router";

const StandardDropzone = () => {
    const [presignedUrl, setPresignedUrl] = useState("");
    const [file, setFile] = useState<File | null>(null)

    const [websiteName, setWebsiteName] = useState('');
    const [description, setDescription] = useState('');
    const [tagline, setTagline] = useState('');
    const [websiteURL, setWebsiteURL] = useState('');
    const [btnDisabled, setBtnDisabled] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const router = useRouter();


    const { mutateAsync: fetchPresignedUrls } = api.s3.getStandardUploadPresignedUrl.useMutation();
    const details = api.details.insert.useMutation({
        onSuccess: () => {
            // Show a success toast
            toast.success("Details inserted successfully");

            // Enable the button and redirect after a delay
            setTimeout(() => {
                setBtnDisabled(false);
                router.push('/buyer/home');
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
        onDropAccepted: async (files, _event) => {
            const file = files[0] ?? null;
            setFile(file)
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl)
            }
            if (file) {
                const url = URL.createObjectURL(file)
                setPreviewUrl(url)
            } else {
                setPreviewUrl(null)
            }

            try {
                const url = await fetchPresignedUrls({ key: generateRandomString() });
                setPresignedUrl(url);
            } catch (err) {
                console.error(err);
                toast.error("Failed to fetch presigned URL");
            }
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

                    // Trigger the mutation to submit form details along with the uploaded file URL
                    
                    
                    const imageurl = presignedUrl.split("?")[0] ?? "";
                    details.mutate({ websiteName, description, tagline, websiteURL, imageUrl: imageurl });

                    console.log("Successfully uploaded ", file.name);
                    toast.success("File uploaded successfully");
                } catch (err) {
                    console.error("Error:", err);
                    toast.error("Failed to upload file");
                }
            }
        }
    }, [acceptedFiles, presignedUrl, websiteName, description, tagline, websiteURL, details]);

    return (
        <section className="max-w-md mx-auto p-4 border rounded-lg shadow-lg">
            <ToastContainer />

            {/* Input for website name */}
            <div className="mb-4">
                <label htmlFor="websiteName" className="block text-gray-700 font-semibold mb-2">Website Name</label>
                <input type="text" id="websiteName" value={websiteName} onChange={(e) => setWebsiteName(e.target.value)} className="w-full border rounded-md px-3 py-2" required />
            </div>
            {/* Input for description */}
            <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Description</label>
                <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border rounded-md px-3 py-2" rows={4} required></textarea>
            </div>
            {/* Input for tagline */}
            <div className="mb-4">
                <label htmlFor="tagline" className="block text-gray-700 font-semibold mb-2">Tagline</label>
                <input type="text" id="tagline" value={tagline} onChange={(e) => setTagline(e.target.value)} className="w-full border rounded-md px-3 py-2" required />
            </div>

            <div>
            <label htmlFor="image" className="block text-gray-700 font-semibold mb-2">Image</label>
                <div {...getRootProps()} className="dropzone-container border-2 border-dashed rounded-lg p-4 mb-4">
                    <input {...getInputProps({ accept: "image/*" })} />
                    {isDragActive ? (
                        <p className="text-center">Drop the file here...</p>
                    ) : (
                        <p className="text-center">Drag 'n' drop file here, or click to select files</p>
                    )}
                    {/* Preview section */}
                    {previewUrl && (
                        <div className="mt-4">
                            <img src={previewUrl} alt="Selected file" className="max-w-full h-auto" />
                        </div>
                    )}
                </div>

            </div>
            {/* Input for website URL */}
            <div className="mb-4">
                <label htmlFor="websiteURL" className="block text-gray-700 font-semibold mb-2">Website URL</label>
                <input type="url" id="websiteURL" value={websiteURL} onChange={(e) => setWebsiteURL(e.target.value)} className="w-full border rounded-md px-3 py-2" required />
            </div>
            {/* Button to trigger file upload */}
            <button
                onClick={handleSubmit}
                disabled={!presignedUrl || acceptedFiles.length === 0 || btnDisabled }
                className="submit-button bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Upload
            </button>
        </section>
    );
};

export default StandardDropzone;
