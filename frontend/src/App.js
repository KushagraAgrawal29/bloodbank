
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/Main';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Navbar/>}/>
    </Routes>
  );
}

export default App;
