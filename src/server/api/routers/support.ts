import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";



export const supportRouter = createTRPCRouter({

    uploadStatus:protectedProcedure
    .query(async({ctx})=>{
        try {
            const userId = ctx.auth.userId;
            if (!userId) {
                throw new Error("User not authenticated");
            }

            const user = await ctx.db.user.findFirst({
                where: { clerkId: userId },
                select: { uploaded: true }
            });

            if (!user) {
                throw new Error("User not found or unauthorized");
            }

            return user.uploaded;
        } catch (error) {
            console.error("Error while processing payment:", error);
           throw new Error("An error occurred while processing the request");
        }

    }),
  
    ticketCreate:protectedProcedure
    .input(z.object({description : z.string()}))
        .mutation(async ({ input: { description },ctx})=>{
        try {
            const userId = ctx.auth.userId;
            if (!userId) {
                throw new Error("User not authenticated");
            }

            const ticket = await ctx.db.ticket.create({
                data: { clerkId: userId, description: description }
            })

        } catch (error) {
            console.error("Error while processing payment:", error);
            throw new Error("An error occurred while processing the request");
        }

    })
});