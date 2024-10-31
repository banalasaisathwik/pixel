import { Status } from '@prisma/client';
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

    const RAZORPAY_WEBHOOK_SECRET = "sai";
    const signature = req.headers["x-razorpay-signature"] as string;
    const requestBody: RazorpayPayload = req.body as RazorpayPayload;

    try {
        if (!validateWebhookSignature(JSON.stringify(requestBody), signature, RAZORPAY_WEBHOOK_SECRET)) {
            console.error('Invalid Razorpay signature');
            return res.status(400).json({ error: 'Invalid signature' });
        }

        const { event, payload } = requestBody;

        if (event === "payment.captured") {
            console.log("Payment captured event received");
            await handleCapturedLogic(payload);
        } else {
            console.log(`Unhandled event: ${event}`);
        }

        return res.status(200).json({ response: 'Success' });

    } catch (error) {
        console.error('Error processing webhook:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function handleCapturedLogic(payload: RazorpayPayload['payload']) {
    try {
        const user = await db.user.findFirst({
            where: { email: payload.payment.entity.email },
            select: { pixelId: true }
        });

        if (!user || !user.pixelId) {
            throw new Error("User not found or no associated pixel ID");
        }

        await db.user.update({
            where: { email: payload.payment.entity.email },
            data: {
                paymentSuccess: true,
                price: payload.payment.entity.amount / 100,
                TransactionId: payload.payment.entity.id,
            }
        });

        await db.coordinate.updateMany({
            where: { pixelId: user.pixelId.toString() },
            data: { status: Status.Sold }
        });

    } catch (error) {
        console.error('Error handling captured logic:', error);
        throw error;
    }
}
