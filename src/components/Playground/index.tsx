import React, { useState, useEffect } from 'react'
import './style.scss'
import { connect } from 'react-redux'
import { ISettings } from "@interfaces/settings"
import { getStatus, playButtonText } from './utils'
import { postWinner } from '@actions/winners'
import { IWinner } from '@interfaces/winner'
import moment from 'moment'

interface IProp extends ReturnType<typeof mapStateToProps>, ReturnType<typeof mapDispatchToProps> {
    postWinner: (name: string, date: string) => Promise<IWinner>
}
interface IReduxProps {
    settings: ISettings,
}



const Playground = ({ settings, postWinner }: IProp) => {
    const [difficult, changeDifficult] = useState<keyof ISettings | string>("easyMode")
    const [firstGame, toggleFirstGame] = useState(true)
    const [isGoing, setIsGoing] = useState(false)
    const [arrayBoxes, changeArrayBoxes] = useState<number[][]>([])
    const [computerGoing, changeComputerGoing] = useState(null)
    const [timeoutPress, changeTimeoutPress] = useState(null)
    const [cordinates, changeCordinates] = useState({ x: null, y: null })
    const [playerScrore, changePlayerScore] = useState<number>(0)
    const [computerScrore, changeComputerScore] = useState<number>(0)

    const { field, delay } = settings[difficult]

    const startTheGame = () => {
        generateArray()
        changeComputerScore(0)
        changePlayerScore(0)
        changeTimeoutPress(clearTimeout(timeoutPress))
        changeComputerGoing(clearInterval(computerGoing))
        toggleFirstGame(false)
        setIsGoing(!isGoing)
    }
    useEffect(() => {
        if (isGoing) {
            changeComputerGoing(setInterval(() => computerToggleBox(), delay))
        } else {
            changeComputerGoing(clearInterval(computerGoing))
        }
        return () => {
            changeComputerGoing(clearInterval(computerGoing))
        }
    }, [isGoing])

    useEffect(() => {
        console.log(playerScrore, computerScrore)
        if (playerScrore > (field ** 2) / 2) {
            changeTimeoutPress(clearTimeout(timeoutPress))
            changeComputerGoing(clearInterval(computerGoing))
            setIsGoing(!isGoing)
            postWinner("User", moment().format("HH:MM; DD MMMM YYYY"))
        }
        if (computerScrore > (field ** 2) / 2) {
            changeTimeoutPress(clearTimeout(timeoutPress))
            changeComputerGoing(clearInterval(computerGoing))
            setIsGoing(!isGoing)
            postWinner("Computer", new Date().toString())
        }
    }, [playerScrore, computerScrore])

    const toggleBox = (x, y) => {
        if (isGoing) {
            if (arrayBoxes[x][y] === 1) {
                changeArrayBoxes(prev => {
                    let newState = [...prev]
                    newState[x][y] = 2
                    return newState
                })
                changePlayerScore(playerScrore + 1)
                changeTimeoutPress(clearTimeout(timeoutPress))
            }
        }
    }
    function randomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const aviableRows = (param) => {
        let rows = []
        let array = [...arrayBoxes]
        array.map((row, i) => row.filter(col => col === param).length !== 0 && rows.push(i))
        return rows
    }
    const aviableCols = (param, row) => {
        let cols = []
        let copyRow = [...row]
        copyRow.map((col, i) => col === param && cols.push(i))
        return cols
    }

    const computerToggleBox = () => {
        const rows = aviableRows(0)
        const x = rows[randomInteger(0, rows.length - 1)]
        const cols = aviableCols(0, [...arrayBoxes[x]])
        const y = cols[randomInteger(0, cols.length - 1)]
        changeCordinates({ x, y })
    }

    useEffect(() => {
        const { x, y } = cordinates
        if (isGoing) {
            changeArrayBoxes(prev => {
                let newState = [...prev]
                newState[x][y] = 1
                return newState
            })
            changeTimeoutPress(setTimeout(() => {
                changeArrayBoxes(prev => {
                    let newState = [...prev]
                    newState[x][y] = 3
                    return newState
                })
                changeComputerScore(prev => {
                    return prev + 1
                })
            }, delay))
        }
    }, [cordinates])

    const generateArray = () => {
        changeArrayBoxes(() => {
            return Array.from(new Array(field), () => new Array(field).fill(0))
        })
    }

    useEffect(() => {
        generateArray()
    }, [difficult])




    return (
        <div className='playground'>
            <div className='status-bar'>
                <select value={difficult} disabled={isGoing} onChange={(e: React.ChangeEvent<HTMLSelectElement>): void => changeDifficult(e.currentTarget.value)}>
                    <option value="easyMode">Easy</option>
                    <option value="normalMode">Normal</option>
                    <option value="hardMode">Hard</option>
                </select>
                <input placeholder='Enter your name' />
                <button onClick={() => startTheGame()}>{playButtonText(firstGame, isGoing)}</button>
            </div>
            <div className="boxes">
                {arrayBoxes.map((row, x) => (
                    <div className='row' key={`row-${x}`}>
                        {row.map((col, y) => (
                            <div className={`box ${getStatus(col)}`} key={`row-${x}-col-${y}`} onClick={() => toggleBox(x, y)} />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

const mapStateToProps = (state): IReduxProps => {
    return {
        settings: state.settings

    }
}

const mapDispatchToProps = () => dispatch => {
    return {
        postWinner: (name, date) => dispatch(postWinner(name, date)),
    }
};


const connector = connect(mapStateToProps, mapDispatchToProps)(Playground)

export { connector as Playground }