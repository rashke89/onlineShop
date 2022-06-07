import logo from './logo.svg';
import './App.css';
import AuthPage from "./pages/authPage";
import Heading from "./pages/heading";

function App() {
  return (
    <div className="main-wrapper">
      <header className="App-header">
        <Heading/>
        <AuthPage/>
      </header>
    </div>

  );
}

export default App;
