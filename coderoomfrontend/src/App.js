import { NavLink, Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import React, { Fragment, useState, useEffect } from 'react';
import './css/reset.css';
import './css/common.css';
import SignupPage from './Pages/SignUpPage';
import LogInPage from './Pages/LogInPage';
import AccountPage from './Pages/AccountPage';
import { HeaderContext } from './contexts/HeaderContext';
import AdminPage from './Pages/AdminPage';
import AdminUsersPage from './Pages/AdminUsersPage';
import Logout from './Pages/Logout';
import WebWorkspace from './Pages/WebWorkspace';
import CreateEditor from './Pages/CreateEditor';
import CreateRoom from './Pages/room/CreateRoomPage';
import Workspace from './Pages/Workspace';
import ScrollToTop from './Components/ScrollToTop';
import RoomPage from './Pages/room/RoomPage';
import HomePage from './Pages/HomePage';
import NotFound from './Pages/NotFound';


function App() {

	/* header state with context */
	const [headerState, setHeaderState] = useState(false);

	const toggleHeader = () => {
		setHeaderState(!headerState)
	};



	return (
		<Fragment>
			<HeaderContext.Provider value={{ headerState, toggleHeader }}>
				<Router>
					<ScrollToTop />
					<MyRouter />
				</Router>
			</HeaderContext.Provider>
		</Fragment>
	);
}

const MyRouter = () => (
	<Switch>
		<Route
			exact
			path="/"
			render={() => {
				return (	
					<Redirect to="/home" />
				)
			}}
		/>
		<Route exact path='/home' component={HomePage} />

		<Route exact path='/admin/users' component={AdminUsersPage} />
		<Route exact path='/admin' component={AdminPage} />

		<Route exact path='/signup' component={SignupPage} />
		<Route exact path='/login' component={LogInPage} />
		<Route exact path='/account' component={AccountPage} />
		<Route exact path='/logout' component={Logout} />

		<Route exact path='/create-editor' component={CreateEditor} />
		<Route exact path='/web-workspace/:id' component={WebWorkspace} />
		<Route exact path='/workspace/:id' component={Workspace} />

		<Route exact path='/create-room' component={CreateRoom} />
		<Route exact path='/room/:id' component={RoomPage} />

		<Route component={NotFound} />
	</Switch>
);

export default App;
