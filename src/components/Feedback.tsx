import React, { type ChangeEvent, type FormEvent, useEffect, useState } from "react";
import { api } from "~/utils/api";

// Define types for form data
interface FormData {
    name: string;
    email: string;
    interest: string;
    message: string;
}

// Define types for API error handling
interface ApiError {
    message: string;
}

// Feedback component
const Feedback: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        interest: "",
        message: ""
    });
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Function to check if feedback was submitted in the last 30 minutes
    const checkSubmissionTime = () => {
        const submissionTime = localStorage.getItem("feedbackSubmissionTime");
        if (submissionTime) {
            const currentTime = new Date().getTime();
            const timeElapsed = currentTime - parseInt(submissionTime, 10);
            const thirtyMinutes = 30 * 60 * 1000;

            if (timeElapsed < thirtyMinutes) {
                setIsSubmitted(true);
            } else {
                localStorage.removeItem("feedbackSubmissionTime"); // Remove old timestamp
            }
        }
    };

    // Check submission time on component mount
    useEffect(() => {
        checkSubmissionTime();
    }, []);

    const feedb = api.support.feedbackCreate.useMutation({
        onSuccess: () => {
            setFormData({
                name: "",
                email: "",
                interest: "",
                message: ""
            });
            localStorage.setItem("feedbackSubmissionTime", new Date().getTime().toString());
            setIsSubmitting(false);
            alert('Feedback submitted successfully.');
            setIsSubmitted(true);
        },
        onError: (error: ApiError) => {
            setIsSubmitting(false);
            alert('Failed to submit the feedback. Please try again.');
            console.error('Feedback submission error:', error);
        }
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
        setError(null);  // Clear error when user starts typing
    };

    const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData((prevData) => ({
            ...prevData,
            interest: e.target.value,
        }));
        setError(null);  // Clear error when user starts typing
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData.message.trim() || !formData.interest.trim()) {
            setError('Message and interest are required.');
            return;
        }
        if (isSubmitted) {
            alert("You can only submit once every 30 minutes.");
            return;
        }
        setIsSubmitting(true);
        try {
            await feedb.mutateAsync({
                message: formData.message,
                interest: formData.interest,
                name: formData.name,
                email: formData.email
            });
        } catch (error) {
            console.error('Feedback submission error:', error);
            setIsSubmitting(false);
            alert('Failed to submit the feedback. Please try again.');
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="md:max-w-xl px-12 text-white w-full min-h-screen flex flex-col justify-center items-center bg-cover bg-center mx-auto pt-44"
        >
            <h2 className="text-2xl font-bold mb-4">Feedback/Suggestion Form</h2>
            <div className="mb-4 w-full">
                <label htmlFor="name" className="block mb-1">Name (Optional)</label>
                <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full py-2 px-4 rounded border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="mb-4 w-full">
                <label htmlFor="email" className="block mb-1">Email (Optional)</label>
                <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full py-2 px-4 rounded border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <div className="mb-4 w-full">
                <label className="block mb-1">Are you interested in working with us?</label>
                <div className="flex items-center space-x-2">
                    {['yes', 'no'].map((option) => (
                        <React.Fragment key={option}>
                            <input
                                type="radio"
                                name="interest"
                                id={`interest${option}`}
                                value={option}
                                checked={formData.interest === option}
                                onChange={handleRadioChange}
                                className="focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <label htmlFor={`interest${option}`}>{option}</label>
                        </React.Fragment>
                    ))}
                </div>
            </div>
            <div className="mb-4 w-full">
                <label htmlFor="message" className="block mb-1">Feedback/Suggestion</label>
                <textarea
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full py-2 px-4 rounded border border-gray-300 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </div>
            <button
                disabled={isSubmitting}
                type="submit"
                className={`py-2 px-4 rounded h-14 w-full ${isSubmitting ? "bg-gray-500 cursor-not-allowed" : "bg-black text-white"
                    }`}
            >
                {isSubmitting ? "Submitting..." : "Submit"}
            </button>
        </form>
    );
};

export default Feedback;
