"use client"
import { type AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from '@vercel/analytics/react';

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Context from "~/components/context";
import Navbar from "~/components/NavBar";
import Footer from "~/components/footer";
import { useRouter } from "next/router";
import Head from "next/head";
import PopUp from "~/components/popUp";
import { useEffect, useState } from "react";
import Ticker from "~/components/ticker";

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
  const [isPopUpOpen, setIsPopUpOpen] = useState(true);


  useEffect(() => {
    const popUpClosed = localStorage.getItem('isPopClose');
    setIsPopUpOpen(popUpClosed === 'true' ? true : false);
  }, []);


  const handlePopUpClose = () => {
    localStorage.setItem('isPopClose', 'true')
    setIsPopUpOpen(true);
  };
  return (
    <div className='bg-[url("/bg.avif")] bg-cover bg-center'>
      {!isPopUpOpen && <PopUp onClose={handlePopUpClose} />}
      <Context>
        <ClerkProvider {...pageProps}>
          <Head>
            <title>bharat startup sankalan</title>
            <meta name="description" content="We are selling tiny ad spaces on a map of India, with each space as small as 10x10 pixels. When you click on an ad on the map(feature only available on desktop), it will show you details about the company behind it." />
            <meta property="og:title" content="bharat-startup-sankalan" />
            <meta property="og:description" content="We are selling tiny ad spaces on a map of India, with each space as small as 10x10 pixels. When you click on an ad on the map(feature only available on desktop), it will show you details about the company behind it." />
            <meta property="og:image" content="/logo.png" />
            <meta property="og:url" content="http://bharatstartupsankalan.com" />
            <link rel="icon" href="/logo.png" />
          </Head>

          {!render && <Navbar />}
          <Component {...pageProps} />
          <Analytics />

        </ClerkProvider>
        {!isAdminRoute && <Footer />}
      </Context>
      <Ticker />
    </div>

  );
};

export default api.withTRPC(MyApp);
