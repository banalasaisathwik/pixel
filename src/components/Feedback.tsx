import React from "react";

const Feedback = () => {
    return (
        <>
            <form className="max-w-md mx-auto mt-16 p-4 bg-white shadow rounded">
                <h2 className="text-2xl font-bold mb-4">Feedback/suggestion Form</h2>
                <div className="mb-4">
                    <label htmlFor="name" className="block mb-1">Name (Optional)</label>
                    <input
                        type="text"
                        id="name"
                        className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block mb-1">Email (Optional)</label>
                    <input
                        type="email"
                        id="email"
                        className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Are you interested in working with us?</label>
                    <div className="flex items-center space-x-2">
                        {['yes', 'no'].map((option) => (
                            <React.Fragment key={option}>
                                <input
                                    type="radio"
                                    name="interest"
                                    id={`interest${option}`}
                                    value={option}
                                    className="focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <label htmlFor={`interest${option}`}>{option}</label>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="message" className="block mb-1">Feedback/suggestion</label>
                    <textarea
                        id="message"
                        className="w-full py-2 px-4 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Submit
                </button>
            </form>
        </>
    );
}

export default Feedback;
