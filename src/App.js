import React, { Suspense, useEffect } from "react";
import { pdfjs } from "react-pdf";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import RoutePaths from "./config/routes/routePaths";
import PageLoader from "./containers/Dashboard/PageLoader";
import ErrorBoundary from "./containers/Errors/ErrorBoundary";
import PageNotFound from "./containers/Errors/PageNotFound";
import "./custom.scss";

const Dashboard = React.lazy(() => import("./containers/Dashboard"));

function App() {
  useEffect(() => {
    // Prevent Going back to previous page
    window.history.pushState(null, document.title, "/");
    window.addEventListener("popstate", () => {
      // TO view the events, pass event as a prop to the function
      window.history.pushState(null, document.title, "/");
    });
  });

  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.js",
    import.meta.url
  ).toString();

  return (
    <Suspense fallback={<PageLoader />}>
      <ErrorBoundary>
        <Router>
          <Routes>
            <Route
              exact
              path={RoutePaths.dashboard.path}
              element={<Dashboard />}
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </ErrorBoundary>
    </Suspense>
  );
}

export default App;
