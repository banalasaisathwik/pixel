import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";



export const buyRouter = createTRPCRouter({
buyPixel: protectedProcedure
    .input(z.object({ coords: z.array(z.object({ x: z.number(), y: z.number() })) }))
        .mutation(async ({ input: { coords }, ctx }) => {
            try {
                const userId = ctx.auth.userId;
                if (!userId) {
                    return {
                        success: false,
                        message: "User not authorized"
                    };
                }

                const user = await ctx.db.user.findUnique({
                    where: { clerkId: userId },
                    select: { purchase: true }
                });

                if (user?.purchase) {
                    return {
                        success: false,
                        message: "User has already made a purchase"
                    };
                }

                let pixel = await ctx.db.pixel.findFirst({
                    where: { User: { some: { clerkId: userId } } }
                });

                if (!pixel) {
                    pixel = await ctx.db.pixel.create({
                        data: { User: { connect: { clerkId: userId } } }
                    });
                }

                const pixelId = pixel.id;

                const coordinates = coords.map(({ x, y }) => ({
                    x,
                    y,
                    pixelId
                }));

                await ctx.db.coordinate.createMany({
                    data: coordinates
                });

                await ctx.db.user.update({
                    where: { clerkId: userId },
                    data: { purchase: true }
                });

                return {
                    success: true,
                    message: "Coordinates added successfully"
                };
            } catch (error) {
                console.error("Error while processing buyPixel:", error);
                return {
                    success: false,
                    message: "An error occurred while processing the request"
                };
            }
        }),
    payment: protectedProcedure
        .query(async ({ ctx }) => {
            try {
                const userId = ctx.auth.userId;
                if (!userId) {
                    throw new Error("User not authenticated");
                }

                const user = await ctx.db.user.findFirst({
                    where: { clerkId: userId },
                    select: { paymentSuccess: true }
                });

                if (!user) {
                    throw new Error("User not found or unauthorized");
                }

                return user.paymentSuccess;
            } catch (error) {
                console.error("Error while processing payment:", error);
                throw new Error("An error occurred while processing the request");
            }
        }),
    purchased : protectedProcedure
    .query(async ({ctx}) => {
        try {
            const userId = ctx.auth.userId;
            if (!userId) {
                throw new Error("User not authenticated");
            }

            const user = await ctx.db.user.findFirst({
                where: { clerkId: userId },
                select: { purchase: true }
            });

            if (!user) {
                throw new Error("User not found or unauthorized");
            }

            return user.purchase;
        } catch (error) {
            console.error("Error while processing payment:", error);
            throw new Error("An error occurred while processing the request");
        }

    })
        })
      


