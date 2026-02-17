/**
 * @module main
 * @description Entry point of the application. Renders the root React component
 * wrapped with StrictMode, Redux Provider, and BrowserRouter.
 */
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'

/**
 * Initializes the React application and mounts it to the DOM.
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
