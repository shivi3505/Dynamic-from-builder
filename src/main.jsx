import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from './store';
import { ErrorBoundary } from 'react-error-boundary';
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <Provider store={store}>
    <ErrorBoundary fallback={<p className='text-center'>something went wrong</p>}>
      <App />
    </ErrorBoundary>
    
  </Provider>
  </StrictMode>,
)


