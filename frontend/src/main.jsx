import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"

import { GoogleOAuthProvider } from "@react-oauth/google";

import { Provider } from "react-redux";
import { store } from "./app/store.js";

const clientId = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")).render(
    <GoogleOAuthProvider clientId={clientId}>
        <Provider store={store}>
            <React.StrictMode>
                <App />
            </React.StrictMode>,
        </Provider>
    </GoogleOAuthProvider>
)
