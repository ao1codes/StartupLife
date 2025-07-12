import { Switch, Route } from "wouter";
import LandingPage from "./pages/landing";
import GamePage from "./pages/game";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/game" component={GamePage} />
      <Route component={LandingPage} />
    </Switch>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-paper">
      <Router />
    </div>
  );
}

export default App;
