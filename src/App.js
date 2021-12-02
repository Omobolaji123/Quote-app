import React, { Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// import AllQuotes from "./pages/AllQuotes";
// import Quote from "./pages/Quote";
// import NewQuote from "./pages/NewQuote";
import Layout from "./components/layout/Layout";
// import NotFound from "./pages/Not-Found";
import LoadingSpinner from "./components/UI/LoadingSpinner";
const AllQuotes = React.lazy(() => import("./pages/AllQuotes"));
const NewQuote = React.lazy(() => import("./pages/NewQuote"));
const Quote = React.lazy(() => import("./pages/Quote"));
const NotFound = React.lazy(() => import("./pages/Not-Found"));
console.log(NewQuote);
function App() {
  return (
    <Layout>
      <Suspense fallback={<div className="centered">
        <LoadingSpinner />
      </div>}>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/quotes" />
          </Route>
          <Route path="/quotes" exact>
            <AllQuotes />
          </Route>
          <Route path="/quotes/:quoteId">
            <Quote />
          </Route>
          <Route path="/new-quote" exact>
            <NewQuote />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
