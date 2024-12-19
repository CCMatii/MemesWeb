import './App.css'
import { ProveedorAutenticacion } from './context/autenticacionContext';
import MemeApp from './memeApp'

function App() {

  return (
    <ProveedorAutenticacion>
      <MemeApp />
    </ProveedorAutenticacion>
  )
}

export default App
