import { NextApiRequest, NextApiResponse } from 'next';
import { validateWebhookSignature } from 'razorpay/dist/utils/razorpay-utils';
import { db } from '~/server/db';

export const config = {
    api: {
        bodyParser: true,
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).end();
    }
    console.log(req.headers);
    
    console.log("body",req.body);
    // Get the webhook secret from the dashboard
    const RAZORPAY_WEBHOOK_SECRET = "sai";

    // Extract signature from X-Razorpay-Signature header
    const signature = req.headers["x-razorpay-signature"] as string;

    // Extract request body
    const requestBody = req.body;

    try {
        // Validate webhook signature
        const isValid = validateWebhookSignature(
            JSON.stringify(requestBody),
            signature,
            RAZORPAY_WEBHOOK_SECRET
        );

        if (isValid) {
            const { event, payload } = requestBody;

            switch (event) {
                case "payment.captured":
                    console.log(payload);
                    await handleyourCapturedLogic(payload);
                    break;

                default:
                    console.log(`Unhandled event: ${event}`);
                    break;
            }
        }
    } catch (error) {
        console.error('Error processing webhook:', error);
        return res.status(500).json({ error: 'Error processing webhook' });
    }

    return res.status(200).json({ response: 'Success' });
}

async function handleyourCapturedLogic(payload: any) {
    try {
        // Update user record based on email
        await db.user.update({
            where: { email: payload.payment.entity.email },
            data: {
                paymentSuccess: true,
                price: payload.payment.entity.amount/100,
                TransactionId: payload.payment.entity.id,
            }
        });
    } catch (error) {
        console.error('Error handling captured logic:', error);
        throw error;
    }
}
