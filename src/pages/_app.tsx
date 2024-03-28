import { type AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Context from "~/components/context";
import Navbar from "~/components/NavBar";
import Footer from "~/components/footer";
import { useRouter } from "next/router";

const MyApp: AppType = ({ Component, pageProps }) => {
  const router = useRouter();

  const isAdminRoute = router.pathname.startsWith('/admin');
  const isTicketRoute = router.pathname.startsWith('/buyer/ticket');
  const isTermsRoute = router.pathname.startsWith('/terms');
  const isPrivacyRoute = router.pathname.startsWith('/privacy');
  const render = isAdminRoute || isTicketRoute || isTermsRoute || isPrivacyRoute



  return (
    <Context>
      <ClerkProvider {...pageProps} publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
        {!render && <Navbar />}
        <Component {...pageProps} />
      </ClerkProvider>
     {!isAdminRoute && <Footer/>}
    </Context>

  );
};

export default api.withTRPC(MyApp);
