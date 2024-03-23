import { createTRPCRouter } from "~/server/api/trpc";
import { adminRouter } from "./routers/admin";
import { buyRouter } from "./routers/TrxPixel";
import { pixelRetRouter } from "./routers/PixelRetrival";
import { websiteDetailsRouter } from "./routers/details";
import { supportRouter } from "./routers/support";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  admin: adminRouter,
  trx: buyRouter,
  pxlR: pixelRetRouter,
  details: websiteDetailsRouter,
  support: supportRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
