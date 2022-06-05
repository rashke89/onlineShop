import logo from './logo.svg';
import './App.css';
import AuthPage from "./pages/authPage";
import Heading from "./pages/heading";

function App() {
  return (
    <div className="main-wrapper">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit TEST <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <Heading/>
        <AuthPage/>
      </header>
    </div>

  );
}

export default App;
