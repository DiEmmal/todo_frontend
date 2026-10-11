import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { CustomHeader } from './shared/components/CustomHeader'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CustomHeader title={"Todo web app"} />
  </StrictMode>,
)
