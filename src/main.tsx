import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import App from './App.tsx'
import Setup from './components/setup/Setup.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='/setup' element={<Setup/>}/>
        </Route>
        {/* <Route path='/setup' element={<Setup />}/> */}
   
      </Routes>
      {/* <App /> */}
    </BrowserRouter>
  </StrictMode>,
)


{/* <Route path='/' element={<App />}/>
</Route>
<Route path='/setup' element={<Setup />}/> */}