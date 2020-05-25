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
    const [message, changeMessage] = useState<string>("")
    const [name, changeName] = useState<string>("")

    const { field, delay } = settings[difficult]


    // Generate an array of empy boxes
    const generateArray = () => {
        changeArrayBoxes(() => {
            return Array.from(new Array(field), () => new Array(field).fill(0))
        })
    }

    // Clear State on start the game
    const startTheGame = () => {
        generateArray()
        changeComputerScore(0)
        changePlayerScore(0)
        changeTimeoutPress(clearTimeout(timeoutPress))
        changeComputerGoing(clearInterval(computerGoing))
        toggleFirstGame(false)
        changeMessage("")
        setIsGoing(!isGoing)
    }

    // Implement computer logic on start the game
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


    // Check user and computer score
    useEffect(() => {
        if (playerScrore > (field ** 2) / 2) {
            finishTheGame(name ? name : "User")
        }
        if (computerScrore > (field ** 2) / 2) {
            finishTheGame("Computer")
        }
    }, [playerScrore, computerScrore])


    // Clear functions on the end of game and toggle message
    const finishTheGame = (winner: string) => {
        changeTimeoutPress(clearTimeout(timeoutPress))
        changeComputerGoing(clearInterval(computerGoing))
        setIsGoing(!isGoing)
        changeMessage(`${winner} win!`)
        postWinner(winner, moment().format("HH:mm; DD MMMM YYYY"))
    }

    // Action on press box 
    const toggleBox = (x, y) => {
        if (isGoing) {
            if (arrayBoxes[x][y] === 1) {
                changeTimeoutPress(clearTimeout(timeoutPress))
                changeArrayBoxes(prev => {
                    let newState = [...prev]
                    newState[x][y] = 2
                    return newState
                })
                changePlayerScore(playerScrore + 1)
            }
        }
    }

    // Get Random number
    function randomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    // Check aviable rows on game field
    const aviableRows = (param) => {
        let rows = []
        let array = [...arrayBoxes]
        array.map((row, i) => row.filter(col => col === param).length !== 0 && rows.push(i))
        return rows
    }

    // Check aviable cols on game field
    const aviableCols = (param, row) => {
        let cols = []
        let copyRow = [...row]
        copyRow.map((col, i) => col === param && cols.push(i))
        return cols
    }


    // Computer logic
    const computerToggleBox = () => {
        const rows = aviableRows(0)
        const x = rows[randomInteger(0, rows.length - 1)]
        const cols = aviableCols(0, [...arrayBoxes[x]])
        const y = cols[randomInteger(0, cols.length - 1)]
        changeCordinates({ x, y })
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


    // On change difficult generate array with new size
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
                <input placeholder='Enter your name' value={name} onChange={(e) => changeName(e.currentTarget.value)} />
                <button onClick={() => startTheGame()}>{playButtonText(firstGame, isGoing)}</button>
            </div>
            <div className='message'>
                {message && message}
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