import * as React from 'react'
import { connect } from 'react-redux'
import { IWinner } from "@interfaces/winner";
import './style.scss'
interface IProp {
    winners: IWinner[]
}

const WinnersTable = ({ winners }: IProp) => {
    return (
        <div className='winners'>
            <h2>Leaders Table</h2>
            <div>
                {winners.map((item, i) => (
                    <div className='winner-row' key={item.id}>
                        <div className='winner'>{item.winner}</div>
                        <div className='daet'>{item.date}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        winners: state.winners
    }
}


const connectedWinnersTable = connect(mapStateToProps, null)(WinnersTable)

export { connectedWinnersTable as WinnersTable }
