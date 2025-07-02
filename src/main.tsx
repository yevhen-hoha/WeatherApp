import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/default.scss'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { store } from './store'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
    </BrowserRouter>
  </StrictMode>,
)
