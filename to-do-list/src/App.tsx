import { useEffect, useReducer, useRef } from 'react'
import './App.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import reducer from './reducers/todoReducer';

function App() {
  const inputRef: any = useRef(null);
  const [todoList, dispatch] = useReducer(reducer, []);

  useEffect(() => {
    const storedState = localStorage.getItem('state');
    if (storedState) {
      dispatch({
        type: 'setState',
        payload: JSON.parse(storedState)
      })
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('state', JSON.stringify(todoList));
  }, [todoList])

  const handlerClick = (e: any) => {
    e.preventDefault();
    dispatch({
      type: 'add',
      name: inputRef.current?.value
    });
    inputRef.current.value = ''
  }

  const handlerRemove = (index: number) => {
    dispatch({
      type: 'remove',
      index
    })
  }

  const handlerCheckTask = (index: number) => {
    dispatch({
      type: 'check',
      index
    })
  }

  return (
    <>
      <header>
        <nav className="navbar navbar-dark bg-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="#" >
              Todo list
            </a>
          </div>
        </nav>
      </header>
      <div className="container-fluid main">
        <div className="row justify-content-md-center">
          <div className="col-6">
            <h1>List</h1>
            <hr />
            <div className="input-group">
              <input ref={inputRef} type="text" className="form-control" placeholder="New task" />
              <button onClick={handlerClick} className="btn btn-primary" type="button">Add</button>
            </div>
          </div>
          <br />
        </div>
        <div className="row justify-content-md-center tasks">
          <div className="col-6">
            <ul className="list-group">
              {todoList && todoList.map((item:any, index:number) => (
                <li key={item.name} className="list-group-item">
                  <input
                    className="form-check-input me-1"
                    type="checkbox"
                    checked={item.check}
                    onChange={() => handlerCheckTask(index)} />
                  <span className={ item.check ? 'text-decoration-line-through' : '' }>
                    {item.name}
                  </span>

                  <a className="float-end" onClick={() => handlerRemove(index)}><i className="bi bi-trash3"></i></a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
