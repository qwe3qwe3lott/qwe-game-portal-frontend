import React, {Suspense} from 'react';
import {Navigate, Outlet, Route, Routes} from 'react-router-dom';
const HomePage = React.lazy(() => import('./pages/HomePage'));
const SpyRouter = React.lazy(() => import('./spy/Router'));
const YesntRouter = React.lazy(() => import('./yesnt/Router'));

const AppRouter: React.FC = () => {
	return (<Routes>
		<Route path={'/'} element={<Outlet/>}>
			<Route index element={<Suspense><HomePage/></Suspense>}/>
			<Route path={'spy/*'} element={<Suspense><SpyRouter/></Suspense>}/>
			<Route path={'yesnt/*'} element={<Suspense><YesntRouter/></Suspense>}/>
			<Route path={'*'} element={<Navigate to={'/'} replace/>}/>
		</Route>
	</Routes>);
};

export default AppRouter;
