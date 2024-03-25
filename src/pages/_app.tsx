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

  const isNavbarVisible = !router.pathname.startsWith('/buyer/selection');
  const isAdminNavbarVisible = !router.pathname.startsWith('/admin');


  return (
    <Context>
      <ClerkProvider {...pageProps} publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
        {isNavbarVisible && isAdminNavbarVisible && <Navbar />}
        <Component {...pageProps} />
      </ClerkProvider>
     {isAdminNavbarVisible && <Footer/>}
    </Context>

  );
};

export default api.withTRPC(MyApp);
