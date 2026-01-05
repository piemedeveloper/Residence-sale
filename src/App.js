import "./App.css";
import "./assets/css/document.css";
import "./assets/css/unit.css";
import "./assets/css/contract-doc.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";


// Fixed: Wagmi v2 uses WagmiProvider, not WagmiConfig
import { WagmiProvider } from "wagmi";

import { bsc, haqqMainnet } from "viem/chains";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";

import { AuthProvider } from "./context/auth-context";
import ProtectedRoute from "./hooks/protected-routes";
import OpenRoute from "./hooks/open-routes";

import LandingContent from "./layout/landing-content";
import DashboardContent from "./layout/dashboard-content";

import Home from "./pages/home";
import Faq from "./pages/faq";
import About from "./pages/about";
import BlogPosts from "./pages/blog";
import Login from "./pages/welcome/login";
import ForgotPassword from "./pages/welcome/forgot-password";
import ResetPassword from "./pages/welcome/reset-password";
import Register from "./pages/welcome/register";
import LandingProperties from "./pages/properties/landing-properties";
import HowItWorks from "./pages/how-it-works";
import LandingPropertyDetail from "./pages/properties/landing-property-detail";
import HowItWorksDetails from "./pages/how-it-works/how-it-works-details";
import TermsAndConditions from "./pages/documents/terms-and-conditions";

import Summary from "./pages/summary";
import Properties from "./pages/properties";
import PropertyInvest from "./pages/invest/property-invest";
import PropertyDetail from "./pages/properties/property-detail";
import UnitDetails from "./pages/properties/unit-details";
import Rewards from "./pages/rewards";
import Documents from "./pages/documents";
import Investments from "./pages/investments";
import NotFound from "./pages/not-found";
import Wallet from "./pages/wallet";
import { user } from "./features";
import { useSelector } from "react-redux";

function App() {
  const projectId = "384c478577dc3d74092b4cdc65e2358c";
  const userData = useSelector(user.user);

  const chains = [bsc, haqqMainnet];

  // Create wagmi config using Web3Modal helper
  const wagmiConfig = defaultWagmiConfig({
    chains,
    projectId,
    enableAnalytics: true, // Optional
  });

  // Initialize Web3Modal (must be called once at app root)
  createWeb3Modal({
    wagmiConfig,
    projectId,
    chains,
  });

  return (
    <div>
      {/* Fixed: Use WagmiProvider instead of WagmiConfig */}
      <WagmiProvider config={wagmiConfig}>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              {/* Public Landing Routes */}
              <Route path="/" element={<LandingContent />}>
                <Route index element={<Home />} />
                <Route path="faq" element={<Faq />} />
                <Route path="blog" element={<BlogPosts />} />
                <Route path="about" element={<About />} />

                <Route
                  path="login"
                  element={
                    <OpenRoute>
                      <Login />
                    </OpenRoute>
                  }
                />
                <Route
                  path="forgot-password"
                  element={
                    <OpenRoute>
                      <ForgotPassword />
                    </OpenRoute>
                  }
                />
                <Route
                  path="reset-password/:id"
                  element={
                    <OpenRoute>
                      <ResetPassword />
                    </OpenRoute>
                  }
                />
                <Route
                  path="signup"
                  element={
                    <OpenRoute>
                      <Register />
                    </OpenRoute>
                  }
                />

                <Route path="residences" element={<LandingProperties />} />
                <Route path="how-it-works" element={<HowItWorks />} />
                <Route path="residences/:id" element={<LandingPropertyDetail />} />
                <Route path=":id" element={<HowItWorksDetails />} />
                <Route path="terms-and-conditions" element={<TermsAndConditions />} />
                <Route path="*" element={<Home />} />
              </Route>

              {/* Protected Dashboard Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardContent />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Summary />} />
                <Route path="residences" element={<Properties />} />
                <Route path="wallet" element={<Wallet />} />
                <Route path="residences/:id" element={<PropertyDetail />} />
                <Route path="unit/:id" element={<UnitDetails />} />
                <Route path="residences/invest/:id" element={<PropertyInvest user={userData} />} />
                <Route path="rewards" element={<Rewards user={userData} />} />
                <Route path="investments" element={<Investments />} />
                <Route path="documents" element={<Documents />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </WagmiProvider>

      {/* Optional: Tawk.to chat widget */}
      {/* <TawkMessengerReact
        propertyId="65e0ce999131ed19d97353e8"
        widgetId="1hnr2c4n0"
      /> */}
    </div>
  );
}

export default App;