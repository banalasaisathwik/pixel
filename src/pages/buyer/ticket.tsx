import React, { useState } from 'react';
import { api } from '~/utils/api';

function TicketForm() {
    const [description, setDescription] = useState('');
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const ticket = api.support.ticketCreate.useMutation({
        onSuccess: () => {
            setDescription("");
            setIsSubmitting(false); // Reset isSubmitting after successful submission
            alert('Ticket submitted successfully.');
        },
        onError: (error) => {
            setIsSubmitting(false); // Reset isSubmitting if there's an error
            alert('Failed to submit the ticket. Please try again.');
            console.error('Ticket submission error:', error);
        }
    });

    const handleSubmit = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();

        // Simple validation
        if (!description.trim()) {
            setError('Description is required.');
            return;
        }

        setError('');
        setIsSubmitting(true);

        try {
            // Call the ticket mutation
            await ticket.mutateAsync({ description: description });
        } catch (error) {
            console.error('Ticket submission error:', error);
            setIsSubmitting(false);
            alert('Failed to submit the ticket. Please try again.');
        }
    };

    return (
        <section className="w-full min-h-screen flex flex-col justify-center items-center  bg-cover bg-center ">
            <div className="max-w-lg mx-auto bg-white shadow-md p-8 rounded-lg">
                <h2 className="text-2xl mb-4">Please create a ticket here.</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="description" className="block">Description:</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            disabled={isSubmitting}
                            placeholder="Describe your issue or request"
                            rows={4}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        {error && <p className="text-red-500">{error}</p>}
                    </div>
                    <button
                        className="w-full p-4 text-lg bg-black text-white rounded-md cursor-pointer hover:bg-gray-800 focus:outline-none"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Ticket'}
                    </button>
                </form>
            </div>
        </section>
    );
}

export default TicketForm;
