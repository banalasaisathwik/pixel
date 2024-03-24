import { useRouter } from 'next/router';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { api } from '~/utils/api';

const WebsiteForm = () => {
    const router = useRouter();

    const [websiteName, setWebsiteName] = useState('');
    const [tagline, settagline] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<File | null>(null); 
    const [websiteURL, setWebsiteURL] = useState('');
    const [btnDisabled, setBtnDisabled] = useState(false);

    const details = api.details.insert.useMutation({
        onSuccess: () => {
            setBtnDisabled(false);
            router.push('/buyer/home');
        },
        onError: (error) => {
            // Handle error
            console.error('Error while purchasing:', error);
        }
    })

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => { // Adjusted type to ChangeEvent<HTMLInputElement>
        const file = e.target.files && e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => { // Adjusted type to FormEvent<HTMLFormElement>
        e.preventDefault();
        // Handle form submission here, you can send data to backend or perform any action as needed
        details.mutate({ websiteName: websiteName, description: description, tagline: tagline,websiteURL: websiteURL });
        console.log("Website Name:", websiteName);
        console.log("tagline:", tagline);
        console.log("Description:", description);
        console.log("Image:", image);
        console.log("Website URL:", websiteURL);
    };

    return (
        <div className="max-w-xl w-full mx-auto bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl text-center font-bold mb-4">Website Details</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4 mt-10">
                    <label htmlFor="websiteName" className="block text-gray-700 font-semibold mb-2">Website Name</label>
                    <input type="text" id="websiteName" value={websiteName} onChange={(e) => setWebsiteName(e.target.value)} className="w-full border rounded-md px-3 py-2" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="subtitle" className="block text-gray-700 font-semibold mb-2">tagline</label>
                    <input type="text" id="tagline" value={tagline} onChange={(e) => settagline(e.target.value)} className="w-full border rounded-md px-3 py-2" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Description</label>
                    <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full border rounded-md px-3 py-2" rows={4} required></textarea>
                </div>
                <div className="mb-4">
                    <label htmlFor="image" className="block text-gray-700 font-semibold mb-2">Image Upload</label>
                    <input type="file" id="image" onChange={handleImageChange} className="border rounded-md px-3 py-2" accept="image/*" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="websiteURL" className="block text-gray-700 font-semibold mb-2">Website URL</label>
                    <input type="url" id="websiteURL" value={websiteURL} onChange={(e) => setWebsiteURL(e.target.value)} className="w-full border rounded-md px-3 py-2" required />
                </div>
                <button disabled={btnDisabled} type="submit" className="bg-black text-xl mt-4 text-white p-4 rounded-md w-full ">Submit</button>
                

            </form>
        </div>
    );
};

export default WebsiteForm;
