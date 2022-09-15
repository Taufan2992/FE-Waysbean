import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap";

import { QueryClient, QueryClientProvider } from 'react-query';
import { UserContextProvider } from './context/user-context';

const client = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContextProvider>
      <QueryClientProvider client={client}>
       <BrowserRouter>
          <App />
       </BrowserRouter>
      </QueryClientProvider>
    </UserContextProvider>
  </React.StrictMode>,
  // document.getElementById('root')
);

