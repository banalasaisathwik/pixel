
import type * as trpc from '@trpc/server';
import type * as trpcNext from '@trpc/server/adapters/next';
import { getAuth, type SignedInAuthObject, type SignedOutAuthObject } from '@clerk/nextjs/server';
import { db } from "~/server/db";
interface AuthContext {
    auth: SignedInAuthObject | SignedOutAuthObject;
}
import { s3Client } from "../aws/s3";


export const createContextInner = async ({ auth }: AuthContext) => {
    return {
        auth,
        db,
        s3Client
    }
}

export const createContext = async (
    opts: trpcNext.CreateNextContextOptions
) => {
    return await createContextInner({ auth: getAuth(opts.req) })
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>;