import { type AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Context from "~/components/context";
import Navbar from "~/components/NavBar";
import Footer from "~/components/footer";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <Context>
      <ClerkProvider {...pageProps} publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
        <Navbar/>
        <Component {...pageProps} />
      </ClerkProvider>
      <Footer/>
    </Context>

  );
};

export default api.withTRPC(MyApp);
