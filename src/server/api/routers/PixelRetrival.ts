import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const pixelRetRouter = createTRPCRouter({
     clickPixel: publicProcedure
        .input(z.object({ coords: z.object({ x: z.number(), y: z.number() }) }))
        .query(async ({ input: { coords }, ctx }) => {
            try {
                // Find the coordinate based on the provided x and y values
                const result = await ctx.db.coordinate.findFirst({
                    where: {
                        x: coords.x,
                        y: coords.y
                    }
                });

                // If no coordinate is found, return an error message
                if (!result) {
                    return "No results found";
                }

                // Extract the pixelId from the found coordinate
                const pixelId = result.pixelId;

                // Find the website associated with the found coordinate's pixelId
                const website = await ctx.db.website.findUnique({
                    where: {
                        pixelId: pixelId
                    }
                });

                // If no website is associated with the pixelId, return an error message
                if (!website) {
                    return "No website associated with the pixel";
                }

                // Return the found website
                return website;
            } catch (error) {
                console.error("Error while processing clickPixel:", error);
                return "An error occurred while processing the request";
            }
        }),
    getPixelId: publicProcedure
        .input(z.object({ coords: z.object({ x: z.number(), y: z.number() }) }))
        .query(async ({ input: { coords }, ctx }) => {
            try {
                // Find the coordinate based on the provided x and y values
                const result = await ctx.db.coordinate.findFirst({
                    where: {
                        x: coords.x,
                        y: coords.y
                    }
                });

                // If no coordinate is found, return an error message
                if (!result) {
                    return "67528bf4ea5519c14c715bb8";
                }

                // Extract the pixelId from the found coordinate
                const pixelId = result.pixelId;

                if(!pixelId) { return("pixelId not found"); }
                return pixelId;
            } catch (error) {
                console.error("Error while processing clickPixel:", error);
                return "An error occurred while processing the request";
            }
        }),


        soldoutPixel:publicProcedure
        .query(async ({ctx})=>{
            const result = await ctx.db.coordinate.findMany(
                {select :{x:true, y:true}}
            );

            return result;
        }),


});
