import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './AppRouter';
import store from './store';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(<Provider store={store}>
	<BrowserRouter>
		<AppRouter/>
	</BrowserRouter>
</Provider>);

