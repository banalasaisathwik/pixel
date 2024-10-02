// src/server/api/context.ts

import type * as trpc from '@trpc/server';
import type * as trpcNext from '@trpc/server/adapters/next';
import {
    getAuth,
    type SignedInAuthObject,
    type SignedOutAuthObject,
} from '@clerk/nextjs/server';
import { db } from '~/server/db';
import { s3Client } from '../aws/s3';

interface AuthContext {
    auth: SignedInAuthObject | SignedOutAuthObject;
}

export const createContextInner = async ({ auth }: AuthContext) => {
    return {
        auth,
        db,
        s3Client,
    };
};

export const createContext = async (
    opts?: trpcNext.CreateNextContextOptions // Make opts optional
) => {
    let auth: SignedInAuthObject | SignedOutAuthObject;

    // Check if opts and opts.req are available and valid
    if (opts?.req?.headers) {
        try {
            // Attempt to get the auth object from Clerk
            auth = getAuth(opts.req);
        } catch (error) {
            console.error('Error fetching auth:', error);
            auth = { isSignedIn: false, sessionId: null, userId: null } as unknown as SignedOutAuthObject;
        }
    } else {
        // No valid req object; assume unauthenticated state
        auth = { isSignedIn: false, sessionId: null, userId: null } as unknown as SignedOutAuthObject;
    }

    return await createContextInner({ auth });
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
