// Import React and ReactDOM for rendering the application
import React from 'react'
import ReactDOM from 'react-dom/client'

// Import the main App component and global styles
import App from './App.tsx'
import './index.css'

// Create a root React element and render the application
// StrictMode is enabled for additional development checks
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
