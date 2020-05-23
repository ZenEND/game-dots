import React, { useEffect, useState } from "react";
import { getWinners } from "@actions/winners";
import { getSettings } from '@actions/settings'
import {connect, MapDispatchToProps } from "react-redux";
import { withRouter, RouteChildrenProps } from "react-router-dom";
import { IWinner} from "@interfaces/winner";
import { WinnersTable } from "@components/WinnersTable";
import { Playground } from '@components/Playground'
import './style.scss'
import { ISettings } from "@interfaces/settings";


interface IProps extends RouteChildrenProps, ReturnType<typeof mapStateToProps>, ReturnType<typeof mapDispatchToProps> {
	getWinners: () => Promise<IWinner[]>
	getSettings: () => Promise<ISettings>	
}


const Home:React.FC<IProps> = ({ history, getWinners, getSettings }: IProps) => {
	const [isGoing, setGoing] = useState(false);
	useEffect(() => {
		getWinners()
		getSettings()
	}, [])
	return (
		<div className='home'>
			<Playground />
			<WinnersTable />
		</div>
	);
};

const mapStateToProps = state => {
	return{
		winners: state.winners
	}
}


const mapDispatchToProps = () => dispatch => {
	return{
		getWinners: () => dispatch(getWinners()),
		getSettings: () => dispatch(getSettings())
	}
};

const connector = connect(mapStateToProps, mapDispatchToProps)(Home)
export { connector as Home };
