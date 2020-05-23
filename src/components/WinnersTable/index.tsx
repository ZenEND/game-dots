import * as React from 'react'
import { connect } from 'react-redux'
import {IWinner} from "@interfaces/winner";

interface IProp {
    winners: IWinner[]
}

const WinnersTable = ({winners}: IProp) => {
    return (
        <div>
            <h2>Leaders Table</h2>
            <div>
                {winners.map((item, i) => (
                    <div key={item.id}>{item.winner}</div>
                ))}
            </div>
        </div>
    )
}


const mapStateToProps = state => {
    return{
        winners: state.winners
    }
}


const connectedWinnersTable = connect(mapStateToProps, null)(WinnersTable)

export { connectedWinnersTable as WinnersTable }
