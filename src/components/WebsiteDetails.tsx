import React, { useState, ChangeEvent, FormEvent } from 'react';

const WebsiteForm = () => {
    const [websiteName, setWebsiteName] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<File | null>(null); // Adjusted type to File | null
    const [websiteURL, setWebsiteURL] = useState('');

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => { // Adjusted type to ChangeEvent<HTMLInputElement>
        const file = e.target.files && e.target.files[0];
        if (file) {
            setImage(file);
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => { // Adjusted type to FormEvent<HTMLFormElement>
        e.preventDefault();
        // Handle form submission here, you can send data to backend or perform any action as needed
        console.log("Website Name:", websiteName);
        console.log("Subtitle:", subtitle);
        console.log("Description:", description);
        console.log("Image:", image);
        console.log("Website URL:", websiteURL);
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Website Details</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="websiteName" className="block text-gray-700 font-semibold mb-2">Website Name</label>
                    <input type="text" id="websiteName" value={websiteName} onChange={(e) => setWebsiteName(e.target.value)} className="w-full border rounded-md px-3 py-2" required />
                </div>
                <div className="mb-4">
                    <label htmlFor="subtitle" className="block text-gray-700 font-semibold mb-2">Subtitle</label>
                    <input type="text" id="subtitle" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} className="w-full border rounded-md px-3 py-2" required />
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
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Submit</button>
            </form>
        </div>
    );
};

export default WebsiteForm;
