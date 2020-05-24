import React, { useEffect, useState } from "react";
import { getWinners } from "@actions/winners";
import { getSettings } from '@actions/settings'
import { connect } from "react-redux";
import { IWinner } from "@interfaces/winner";
import { WinnersTable } from "@components/WinnersTable";
import { Playground } from '@components/Playground'
import { ISettings } from "@interfaces/settings";

import './style.scss'


interface IProps extends ReturnType<typeof mapDispatchToProps> {
	getWinners: () => Promise<IWinner[]>
	getSettings: () => Promise<ISettings>
}


const Home = ({ getWinners, getSettings }: IProps) => {
	const [isLoading, setIsLoading] = useState<boolean>(true)
	useEffect(() => {
		Promise.all([
			getWinners(),
			getSettings()
		]).then(() => {
			setIsLoading(false)
		})
	}, [])
	return (
		<div className='home'>
			{!isLoading ? (
				<>
					<Playground />
					<WinnersTable />
				</>
			) : (
					<div>Loading...</div>
				)}
		</div>
	);
};


const mapDispatchToProps = () => dispatch => {
	return {
		getWinners: () => dispatch(getWinners()),
		getSettings: () => dispatch(getSettings())
	}
};

const connector = connect(null, mapDispatchToProps)(Home)
export { connector as Home };
