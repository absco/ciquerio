import { Switch, Route, Link } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import Home from "@/pages/Home";
import BlogPost from "@/pages/BlogPost";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import NotFound from "@/pages/not-found";
import { useState, useEffect } from "react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/blog/:id" component={BlogPost} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route component={NotFound} />
    </Switch>
  );
}

function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if user has already given consent
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowConsent(false);
  };

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShowConsent(false);
  };

  if (!showConsent) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md bg-white shadow-lg rounded-lg border border-gray-200 p-4">
      <div className="mb-4">
        <h4 className="text-lg font-medium mb-2">Cookie Consent</h4>
        <p className="text-sm text-gray-600">
          We use cookies to enhance your browsing experience, analyse site traffic, and personalise content. 
          By clicking "Accept", you consent to our use of cookies. You can learn more in our{" "}
          <Link href="/privacy-policy" className="text-primary hover:underline">
            Privacy Policy
          </Link>.
        </p>
      </div>
      <div className="flex justify-end space-x-2">
        <Button variant="outline" size="sm" onClick={declineCookies}>Decline</Button>
        <Button size="sm" onClick={acceptCookies}>Accept</Button>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <CookieConsent />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
