import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
// import 'bootstrap/dist/css/bootstrap.min.css';

import reducer from '../src/reducers';
import middleware from '../src/middleware'
import Main from './components/Main';

function App() {

  const store = createStore(reducer, middleware);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Main />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
