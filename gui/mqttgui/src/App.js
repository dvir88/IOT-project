import './App.css';
import ControlePanel from "./Components/ControlePanel";

function App() {
  const client = new WebSocket("ws://localhost:8080");
  return (
    <ControlePanel client={client}>
    </ControlePanel>
  );
}

export default App;
