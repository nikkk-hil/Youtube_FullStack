import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from './context/AuthContext.jsx';

import './index.css'
import App from './App.jsx'

/*
  QueryClient = Database
  useQuery     = SELECT
  useMutation  = INSERT / UPDATE
*/

const queryClient = new QueryClient()  //single cached manager helps all component to use useQuery, useMutation

createRoot(document.getElementById('root')).render(
  //shared cached manager share cache all over components
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </QueryClientProvider>
  ,
)
