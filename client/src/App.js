import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import LandingPage from "./landing-page/landing-page";
import Error from "./error";
import { theme } from "./themes/theme";
import { ThemeProvider } from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import { userContext } from "./context/user-context";
import PageNavigator from "./navigation/page-navigator";
import Profile from "./profile/profile";

export default function App({ initUser }) {
  const [user, setUser] = useState(initUser);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <userContext.Provider value={{ user, setUser }}>
        <Route path="/(dashboard|job-board|search-jobs)" component={Profile} />
        <Switch>
          <Route
            exact
            path="/dashboard"
            render={() => <PageNavigator page="dashboard" />}
          />
          <Route
            exact
            path="/job-board"
            render={() => <PageNavigator page="job-board" />}
          />
          <Route
            exact
            path="/search-jobs"
            render={() => <PageNavigator page="search-jobs" />}
          />
          <Route exact path="/" component={LandingPage} />
          <Route path="*" component={Error} />
        </Switch>
      </userContext.Provider>
    </ThemeProvider>
  );
}
