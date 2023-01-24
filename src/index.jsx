import React from 'react';
import { createRoot } from 'react-dom/client';

import { MovieCard } from './components/movie-card/movie-card'
import { MainView } from './components/main-view/main-view'
import Container from 'react-bootstrap/Container';

import { createStore } from "redux";
import { Provider } from "react-redux";
import { devToolsEnhancer } from 'redux-devtools-extension';
import moviesApp from './reducers/reducers';

import "bootstrap/dist/css/bootstrap.min.css";

//import statement to indicate that you need to bundle ./index.scss
import './index.scss';

const store = createStore(moviesApp, devToolsEnhancer());

//Main component (will eventually use all others)
class MyFlixApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container>
        <MainView/>
        </Container>
      </Provider>
    );
  }
}

//finds the root of the app
const container = document.getElementsByClassName('app-container') [0];
const root = createRoot(container); 

//tells React to render your app int he root of the DOM element.
root.render(<MyFlixApplication/>);
