import * as React from "react";
import * as actions from "@actions/post";
import { connect } from "react-redux";
const Home = () => {
	return (
		<div>
			<p>This is a Home page </p>
		</div>
	);
};

const mapDispatchToProps = {
	setPost: actions.setPost,
};
const connectedHome = connect(null, null)(Home);
export { connectedHome as Home };
