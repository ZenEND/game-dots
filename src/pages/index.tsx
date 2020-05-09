import * as React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { Home } from "./Home";

const Routes = () => {
	return (
		<Switch>
			<Route exact path="/" component={Home} />
		</Switch>
	);
};

export { Routes };
