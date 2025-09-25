import { Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Import your page and component files
import Home from './pages/Home';
import Residents from './pages/Residents';
import ResidentDetails from './pages/ResidentDetails';
import Contact from './pages/Contact';

// --- NEW IMPORT ---
import Header from './components/Header'; 
// ------------------

function App() {
  return (
    <>
      {/* Renders the Header component defined in Header.jsx */}
      <Header />
      
      {/* This <nav> is now styled with Flexbox and spacing via App.css */}
      <nav>
        <Link to="/">Home</Link>
        <Link to="/residents">Residents</Link>
        <Link to="/contact">Contact</Link>
      </nav>
      
      {/* This <main> tag contains the content for each route, styled with padding in App.css */}
      <main>
        {/* Defines the routing structure */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/residents" element={<Residents />} />
          <Route path="/residents/:id" element={<ResidentDetails />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </>
  );
}

export default App;