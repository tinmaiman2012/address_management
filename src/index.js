import { AppContainer } from 'react-hot-loader'
import { applyMiddleware, compose, createStore } from 'redux'
import { createBrowserHistory } from 'history'
import { routerMiddleware, connectRouter } from 'connected-react-router'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import indexReducer from './reducers/index'

const history = createBrowserHistory();
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    connectRouter(history)(indexReducer),
    composeEnhancer(
        applyMiddleware(
            routerMiddleware(history),
        ),
    ),
);

const render = () => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <App history={history} />
            </Provider>
        </AppContainer>,
        document.getElementById('app')
    )
};

render();

if (module.hot) {
    // Reload components
    module.hot.accept('./App', () => {
        render()
    });

    // Reload reducers
    module.hot.accept('./reducers', () => {
        store.replaceReducer(connectRouter(history)(indexReducer))
    })
}
