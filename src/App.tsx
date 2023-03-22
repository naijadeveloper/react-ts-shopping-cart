import { useState } from 'react'
import { Container } from 'react-bootstrap';
import { Routes, Route } from "react-router-dom";
//Pages
import Home from "./pages/Home";
import Store from "./pages/Store";
import About from './pages/About';
//Components
import NavBar from './components/NavBar';
import { ShoppingCartContextProvider } from './context/ShoppingCartContext';
import ShoppingCart from "./components/ShoppingCart";

function App() {
  const [count, setCount] = useState(0)

  return (
    <ShoppingCartContextProvider>
      <NavBar />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/store" element={<Store />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Container>
      <ShoppingCart />
    </ShoppingCartContextProvider>
  );
}

export default App
