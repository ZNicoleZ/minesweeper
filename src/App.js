import logo from './logo.svg';
import './App.css';
import Board from "./components/Board";
import StarfieldAnimation from 'react-starfield-animation'


function App() {
  return (
    <div className="App">
      <title>Minesweeperr</title>
      <StarfieldAnimation 
                style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                zIndex: 'auto'
                }}
            />
      <Board />
    </div>
  );
}

export default App;
