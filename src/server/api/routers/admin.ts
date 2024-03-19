import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";



export const adminRouter = createTRPCRouter({

    updatedPxl: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ input: { id }, ctx }) => {
            try {
                const data = {
                    uploaded: true
                };

                await ctx.db.website.update({
                    where :{id:id},
                    data: data
                })
                return { success: true, message: 'User uploaded flag set to true' };
            } catch (error) {
                console.error('Error updating user uploaded flag:', error);
                throw new Error('Failed to update user uploaded flag');
            }
        }),


    toUpdate: protectedProcedure
        .query(async ({ ctx }) => {
            try {
                const results = await ctx.db.pixel.findMany({
                    select:{ coordinates:true,website:{select:{id:true,imageUrl:true}}},
                    where: {
                        website: {
                            uploaded: false,
                            createdAt: {
                                gt: new Date(Date.now() - 24 * 60 * 60 * 1000) 
                            }
                        }
                    }
                });

                return results;
            } catch (error) {
                console.error('Error fetching pixels to update:', error);
                throw new Error('Failed to fetch pixels to update');
            }
        }),

    notYetUploaded:protectedProcedure
    .query(async ({ctx}) => {
        try {
            const results = await ctx.db.pixel.findMany({
                select: { coordinates: true, website: { select: { id:true,imageUrl: true } } },
                where: {
                    website: {
                        uploaded: false
                    }
                }
            });

            return results;
        } catch (error) {
            console.error('Error fetching pixels to update:', error);
            throw new Error('Failed to fetch pixels to update');
        }
    })
});