import * as React from "react";
import * as actions from "@actions/post";
import { connect } from "react-redux";
import { withRouter, RouteChildrenProps } from "react-router-dom";
import axios from "axios";

interface IProps extends RouteChildrenProps {}

const Home = ({ history }: IProps) => {
	enum person {
		age,
		name,
	}

	interface IResponse {
		data: {
			completed: boolean;
		}[];
	}

	interface Iprops {}

	React.useEffect(() => {
		axios
			.get("https://jsonplaceholder.typicode.com/todos/1")
			.then(<T extends IResponse>(res: T) => {
				console.log(res.data);
			});
	}, []);
	return (
		<div>
			<p>This is a Home page </p>
		</div>
	);
};

const mapDispatchToProps = {
	setPost: actions.setPost,
};

const withRouterHome = withRouter(Home);
const connectedHome = connect(null, null)(withRouterHome);
export { connectedHome as Home };
