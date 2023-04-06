import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataProvider } from "./context/GlobalContext";
import GlobalStyles from "./styled/GlobalStyles";
import { ClientProvider } from "./context/ClientContext";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if (process.env.NODE_ENV === "production") disableReactDevTools();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <ClientProvider>
      <DataProvider>
        <GlobalStyles />
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </DataProvider>
    </ClientProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
