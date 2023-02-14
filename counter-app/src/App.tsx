import './App.css'
import reactLogo from './assets/react.svg';
import Counter from './components/Counter'

function App() {

  return (
    <div className="App">
      <header>
        <img src={reactLogo} alt="" />
        <h1 className='title'>Counter App</h1>
      </header>
      <Counter />
    </div>
  )
}

export default App
