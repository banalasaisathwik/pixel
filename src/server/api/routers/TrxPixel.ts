import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";



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

                let pixel = await ctx.db.pixel.findFirst({
                    where: {
                        User:{some:{id: userId}}
                    }
                });

                if (!pixel) {
                    pixel = await ctx.db.pixel.create({
                        data: {
                            User:{connect:{id: userId}}
                        }
                    });
                }

                const pixelId = pixel?.id || "";

                const coordinates = coords.map(({ x, y }) => ({
                    x,
                    y,
                    pixelId
                }));

                await ctx.db.coordinate.createMany({
                    data: coordinates
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
    island: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ input: { id }, ctx }) => {
            try {
                const data = {
                    onIsland: true,
                };

                const updatedUser = await ctx.db.user.update({
                    where: { id: id },
                    data:data,
                });

                return updatedUser;
            } catch (error) {
                console.error('Error updating user:', error);
                throw new Error('Failed to update user island status');
            }
        }),
    

});
