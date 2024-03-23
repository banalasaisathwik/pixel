import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";



export const websiteDetailsRouter = createTRPCRouter({

    insert: protectedProcedure
        .input(z.object({
            websiteName: z.string(),
            tagline: z.string(),
            description: z.string(),
            websiteURL: z.string()
        }))
        .mutation(async ({ input: { websiteName, tagline, description, websiteURL }, ctx }) => {
            try {
                const userId = ctx.auth.userId;

                // Ensure user exists and get the pixelId
                const user = await ctx.db.user.findFirst({
                    where: { clerkId: userId },
                    select: { pixelId: true }
                });

                if (!user || !user.pixelId) {
                    throw new Error('User not found or pixelId not available');
                }

                const pixelId = user.pixelId;

                // Check if website already exists for the user
                const existingWebsite = await ctx.db.website.findFirst({
                    where: {
                        User: { some: { clerkId: userId } } // Assuming websiteURL is unique for each user
                    }
                });

                let createdWebsite;

                if (existingWebsite) {
                    // If an existing website is found, update it
                    createdWebsite = await ctx.db.website.update({
                        where: { id: existingWebsite.id },
                        data: {
                            imageUrl: "",
                            websiteUrl: websiteURL,
                            websiteName: websiteName,
                            tagline: tagline,
                            description: description,
                            uploaded: false,
                            visitors:1,
                            Pixel: {
                                connect: {
                                    id: pixelId
                                }
                            }
                        }
                    });
                } else {
                    // If no existing website is found, create a new one
                    createdWebsite = await ctx.db.website.create({
                        data: {
                            imageUrl: "",
                            websiteUrl: websiteURL,
                            websiteName: websiteName,
                            tagline: tagline,
                            description: description,
                            uploaded: false,
                            visitors: 1,
                            Pixel: {
                                connect: {
                                    id: pixelId
                                }
                            },
                            User: {
                                connect: {
                                    clerkId: userId
                                }
                            }
                        }
                    });
                }

                return createdWebsite;
            } catch (error) {
                console.error('Error inserting/updating website:', error);
                throw new Error('Failed to insert/update website');
            }
        }),
    retrive : publicProcedure
    .input(z.object({col:z.number(), row:z.number()}))
    .query(async ({input:{col,row},ctx})=>{
        const coordinate = await ctx.db.coordinate.findFirst({
            where: { x: col, y: row },
            select: { pixelId: true }
        });

        if (coordinate) {
            const pixelId = coordinate.pixelId;
            const result = await ctx.db.website.findFirst({
                where:{pixelId: pixelId},
                select: {
                    id:true,
                    imageUrl: true,
                    websiteUrl: true,
                    websiteName: true,
                    tagline: true,
                    description: true,
                  }
            })
            return result;
        } else {
            // Handle the case where the coordinate was not found
        }

    }),

    detailsStatus:protectedProcedure
    .query(async ({ctx})=>{
        const userId = ctx.auth.userId;

        try {
            const status = await ctx.db.website.findFirst({
                where: {
                    User: {
                        some: {
                            clerkId: userId
                        }
                    }
                },
                select: {
                    websiteName: true
                }
            });

            if (status) {
                return {
                    success: true,
                    
                };
            } else {
                return {
                    success: false,
                    
                };
            }
        } catch (error) {
            console.error("Error fetching website status:", error);
            return {
                success: false,
                message: "Failed to fetch website status."
            };
        }

    }),

    visitors : publicProcedure
    .input(z.object({websiteId :  z.string()}))
        .mutation(async ({ input: { websiteId },ctx}) => {
            const up = await ctx.db.website.update({

                where:{ id : websiteId},
                data: {
                    visitors: {
                        increment: 1 // Increment the visitors count by 1
                    }
                },
                select:{visitors:true}
            })

            return up;
    })

});