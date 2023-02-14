import { useState } from 'react';
import './Counter.scss';

function Counter({ value=0 }) {
    const [counter, setCounter] = useState(value);

    const handlerIncrement= ()=> {
        setCounter(counter + 1)
    }

    const handlerDecrement = () => {
        if (counter > 0) {
            setCounter(counter - 1);
        }
    }

    const reset = () => {
        setCounter(value)
    }

    return (
        <>
            <div>
                <span className='counter-value' data-testid='counter-value' >{counter}</span>
            </div>
            <div className='buttons'>
                <button onClick={handlerIncrement}>+</button>
                <button onClick={handlerDecrement}>-</button>
                <button onClick={reset}>Reset</button>
            </div>
        </>
    );
}

export default Counter;