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
        <div>
            <h2>Ticket</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        disabled={isSubmitting}
                        placeholder="Describe your issue or request"
                        rows={4}
                        style={{ width: '100%' }}
                    />
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </div>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Submit Ticket'}
                </button>
            </form>
        </div>
    );
}

export default TicketForm;
