import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import App from './App.tsx'
import Setup from './components/setup/Setup.tsx';
import Home from './components/Home/Home.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Home />}/>
          <Route path='/setup/:ID' element={<Setup/>}/>
        </Route>

   
      </Routes>

    </BrowserRouter>
  </StrictMode>,
)

