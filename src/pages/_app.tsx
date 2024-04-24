import { type AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Context from "~/components/context";
import Navbar from "~/components/NavBar";
import Footer from "~/components/footer";
import { useRouter } from "next/router";
import Head from "next/head";

const MyApp: AppType = ({ Component, pageProps }) => {
  const router = useRouter();

  const isAdminRoute = router.pathname.startsWith('/admin');
  const isTicketRoute = router.pathname.startsWith('/buyer/ticket');
  const isTermsRoute = router.pathname.startsWith('/terms');
  const isPrivacyRoute = router.pathname.startsWith('/privacy');
  const isSelectionRoute = router.pathname.startsWith('/buyer/selection');
  const isSignin = router.pathname.startsWith('/sign-in');
  const isSignup = router.pathname.startsWith('/sign-up');

  const render = isAdminRoute || isTicketRoute || isTermsRoute || isPrivacyRoute || isSignin || isSignup || isSelectionRoute



  return (
    <Context>
      <ClerkProvider {...pageProps}>
        <Head>
          <title>bharat startup sankalan</title>
          <meta name="description" content="Welcome to Bharath Startup Sankalan, your platform for dreams to flourish. Join us in crafting your brand's story on the vibrant canvas of India. Experience the thrill of connecting with your audience as our community grows. Explore our advertising options today and embark on a journey of boundless possibilities!"/>
          <link rel="icon" href="/logo.png" />
        </Head>

        {!render && <Navbar />}
        <Component {...pageProps} />
      </ClerkProvider>
     {!isAdminRoute && <Footer/>}
    </Context>

  );
};

export default api.withTRPC(MyApp);
