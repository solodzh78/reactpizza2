import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom';

import './scss/app.scss';

import { MainLayout } from './layouts/MainLayout';
import { Home } from './pages/Home';
const Cart = React.lazy(() => import(/*webpackChunkName: "Cart"*/ './pages/Cart'));
const PizzaFull = React.lazy(() => import(/*webpackChunkName: "PizzaFull"*/ './pages/PizzaFull'));
const NotFound = React.lazy(() => import(/*webpackChunkName: "NotFound"*/ './pages/NotFound'));

function App() {
    return (
		<Routes>
			<Route path='/' element={<MainLayout />}>
				<Route path='/' element={<Home />}/>
				<Route path='cart' element={
					<Suspense fallback={<div>Загрузка...</div>}>
						<Cart />
					</Suspense>}
				/>
				<Route path='pizza/:id' element={
					<Suspense fallback={<div>Загрузка...</div>}>
						<PizzaFull />
					</Suspense>}/>
				<Route path='*' element={<NotFound/>}/>
			</Route>
		</Routes>
    );
}

export default App;
