import type { NextApiRequest, NextApiResponse } from 'next';
import { validateWebhookSignature } from 'razorpay/dist/utils/razorpay-utils';
import { db } from '~/server/db';

interface RazorpayPayload {
    event: string;
    payload: {
        payment: {
            entity: {
                email: string;
                amount: number;
                id: string;
            };
        };
    };
}

export const config = {
    api: {
        bodyParser: true,
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }

    // Get the webhook secret from the dashboard
    const RAZORPAY_WEBHOOK_SECRET = "sai";

    if (!RAZORPAY_WEBHOOK_SECRET) {
        throw new Error('Please add secret');
    }

    // Extract signature from X-Razorpay-Signature header
    const signature = req.headers["x-razorpay-signature"] as string;

    // Extract request body
    const requestBody: RazorpayPayload = req.body as RazorpayPayload;

    try {
        // Validate webhook signature
        const isValid: boolean = validateWebhookSignature(
            JSON.stringify(requestBody),
            signature,
            RAZORPAY_WEBHOOK_SECRET
        );

        if (isValid) {
            const { event, payload } = requestBody ;

            switch (event) {
                case "payment.captured":
                    console.log(payload);
                    await handleCapturedLogic(payload);
                    break;

                default:
                    console.log(`Unhandled event: ${event}`);
                    break;
            }
        }
    }  catch (error) {
        if (error instanceof Error) {
            console.error('Error handling captured logic:', error);
        } else {
            console.error('Unknown error occurred:', error);
        }
        throw error;
    }

    return res.status(200).json({ response: 'Success' });
}

async function handleCapturedLogic(payload: RazorpayPayload['payload']) {
    try {
        // Update user record based on email
        await db.user.update({
            where: { email: payload.payment.entity.email },
            data: {
                paymentSuccess: true,
                price: payload.payment.entity.amount / 100,
                TransactionId: payload.payment.entity.id,
            }
        });
    } catch (error) {
        console.error('Error handling captured logic:', error);
        throw error;
    }
}
