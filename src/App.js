import logo from './logo.svg';
import './App.css';
import LoginForm  from './LoginForm';

function App() {
  return (
    <div className="App">
      <LoginForm submit={values =>alert(JSON.stringify(values))}/>
    </div>
  );
}

export default App;
