import { act, render, renderHook, screen } from '../test-utils';
import React, { useReducer } from 'react';
import todoReducer from '../../src/reducers/todoReducer';

describe('Unit test todo reducer', () => {
    const initState = [
        {
            name: 'Test',
            check: true
        },
        {
            name: 'Demo',
            check: false
        }
    ]

  it('todoReducer - setState', () => {
    const { result } = renderHook(()=> useReducer(todoReducer, []));
    const [_, dispatch] = result.current
    act(() => {
        dispatch({type: 'setState', payload: initState});
    })
    
    expect(result.current[0]).toBe(initState)
  });

  it('todoReducer - Add element to the state', () => {
    const { result } = renderHook(()=> useReducer(todoReducer, []));

    const item = {
        name: 'Test',
        check: false
    };
    act(() => {
        const [_, dispatch] = result.current
        dispatch({type: 'add', name: item.name});
    })
    
    const [state] = result.current
    expect(state).toStrictEqual([item]);
  });

  it('todoReducer - remove one element to the state', () => {
    const { result } = renderHook(()=> useReducer(todoReducer, []));
    act(() => {
        const [_, dispatch] = result.current
        dispatch({type: 'setState', payload: initState});
        dispatch({type: 'remove', index: 1});
    })
    
    const [state] = result.current
    const currentState = [
        {
            name: 'Test',
            check: true
        }
    ]
    expect(state).toStrictEqual(currentState);
  });


  it('todoReducer - check one element', () => {
    const { result } = renderHook(()=> useReducer(todoReducer, []));
    act(() => {
        const [_, dispatch] = result.current
        dispatch({type: 'setState', payload: initState});
        dispatch({type: 'check', index: 1});
    })
    
    const [state] = result.current
    const currentState = initState.map (item => {
        if (item.name === 'Demo') {
            item.check = true
        }
        return item;
    })
    expect(state).toStrictEqual(currentState);
  });
});