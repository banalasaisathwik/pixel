import { Status } from "@prisma/client";
import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const buyRouter = createTRPCRouter({
    reservingPixel: protectedProcedure
        .input(z.object({ coords: z.array(z.object({ x: z.number(), y: z.number() })) }))
        .mutation(async ({ input: { coords }, ctx }) => {
            try {
                const userId = ctx.auth.userId;
                if (!userId) {
                    return {
                        success: false,
                        message: "You need to be logged in to purchase pixels.",
                    };
                }

                const user = await ctx.db.user.findUnique({
                    where: { clerkId: userId },
                    select: { purchase: true },
                });

                if (user?.purchase) {
                    return {
                        success: false,
                        message: "You have already made a purchase. Each user can only buy pixels once.",
                    };
                }

                // Check for any conflicting coordinates
                const existingCoordinates = await ctx.db.coordinate.findMany({
                    where: {
                        OR: coords.map(({ x, y }) => ({ x, y })),
                    },
                });

                if (existingCoordinates.length > 0) {
                    return {
                        success: false,
                        message: "Some of the selected pixels are already taken. Please choose different coordinates.",
                    };
                }

                // Create or find the pixel associated with the user
                let pixel = await ctx.db.pixel.findFirst({
                    where: { User: { some: { clerkId: userId } } },
                });

                if (!pixel) {
                    pixel = await ctx.db.pixel.create({
                        data: { User: { connect: { clerkId: userId } } },
                    });
                }

                const pixelId = pixel.id;

                // Map coordinates to include pixelId
                const coordinates = coords.map(({ x, y }) => ({
                    x,
                    y,
                    pixelId,
                    status: Status.Reserved,
                    reservationExpiry: new Date(Date.now() + 5 * 60 * 1000),
                }));

                // Since no conflicts were found, proceed with adding all coordinates
                await ctx.db.coordinate.createMany({
                    data: coordinates,
                });

                // Update user's purchase status
                await ctx.db.user.update({
                    where: { clerkId: userId },
                    data: { purchase: true, noOfPixels: coords.length },

                });

                return {
                    success: true,
                    message: "Your pixels have been successfully added to the map!",
                };
            } catch (error) {
                console.error("Error while processing buyPixel:", error);
                return {
                    success: false,
                    message: "An unexpected error occurred. Please try again later.",
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

    }),

    statusChangeAfterExp: protectedProcedure
        .mutation(async ({ ctx }) => {
            try {
                // Step 1: Delete expired reservations with `Reserved` status
                await ctx.db.coordinate.deleteMany({
                    where: {
                        reservationExpiry: { lt: new Date() },
                        status: { equals: Status.Reserved }
                    }
                });

                // Step 2: Get pixel IDs that have no associated coordinates
                const pixelsWithoutCoordinates = await ctx.db.pixel.findMany({
                    where: {
                        coordinates: { none: {} }, // Find pixels with no coordinates
                    },
                    select: { id: true },
                });

                const pixelIdsWithoutCoordinates = pixelsWithoutCoordinates.map(pixel => pixel.id);

                // Step 3: Only proceed if there are any pixel IDs without coordinates
                if (pixelIdsWithoutCoordinates.length > 0) {
                    // Step 4: Find users with those pixels
                    const usersToUpdate = await ctx.db.user.findMany({
                        where: { pixelId: { in: pixelIdsWithoutCoordinates } },
                        select: { id: true },
                    });

                    // Step 5: Update `purchase` field for those users if any users are found
                    if (usersToUpdate.length > 0) {
                        await ctx.db.user.updateMany({
                            where: { id: { in: usersToUpdate.map(user => user.id) } },
                            data: { purchase: false },
                        });
                    }
                }

                return {
                    success: true,
                    message: "Expired reservations have been successfully deleted",
                };
            } catch (error) {
                console.error("Error deleting expired reservations:", error);
                return {
                    success: false,
                    message: "An unexpected error occurred. Please try again later.",
                };
            }
        }),
    quantity: protectedProcedure
        .query(async ({ ctx }) => {
            const id = ctx.auth.userId;
            const user = await ctx.db.user.findFirst({
                where: { clerkId: id },
                select: { noOfPixels: true }
            });

            if (user?.noOfPixels) {
                return { quantity: user.noOfPixels };
            } else {
                return { quantity: 0 }; // or handle differently if no quantity is found
            }
        }),

    expiryTime:protectedProcedure
    .query(async ({ ctx})=>{
        const userId = ctx.auth.userId;

        // Step 1: Get the user's pixel ID(s)
        const user = await ctx.db.user.findFirst({
            where: { clerkId: userId },
            select: { pixelId: true }, // Get the pixelId associated with the user
        });

        if (!user?.pixelId) {
            throw new Error('User has no associated pixels');
        }


        // Step 2: Get the coordinates for the user's pixel
        const coordinates = await ctx.db.coordinate.findFirst({
            where: { pixelId: user.pixelId }, // Filter by user's pixelId
            select: { reservationExpiry: true }, // Select the reservationExpiry field
        });

        // If there are no coordinates, handle accordingly
        if (!coordinates) {
            throw new Error('No coordinates found for the user\'s pixel');
        }

        // Step 3: Return the reservation expiry times
        return coordinates.reservationExpiry;

    })
        
})
      


