import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Survey from "@/pages/survey";
import ThankYou from "@/pages/thank-you";
import PrivacyPolicy from "@/pages/privacy-policy";
import Splash from "@/pages/splash";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Splash} />
      <Route path="/home" component={Home} />
      <Route path="/survey" component={Survey} />
      <Route path="/thank-you" component={ThankYou} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;
