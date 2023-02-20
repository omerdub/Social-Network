import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { DarkModeContextProvider } from './services/context/darkModeContext';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store } from './redux/store';
import { persistStore } from "redux-persist";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "./style.scss";


const persistor = persistStore(store);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  < React.StrictMode >
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path="/*" element={<DarkModeContextProvider>
              <App />
            </DarkModeContextProvider>} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode >
);
