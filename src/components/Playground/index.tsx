import React, { useState, useEffect } from 'react'
import './style.scss'
import { connect } from 'react-redux'
import { ISettings } from "@interfaces/settings"

interface IProp extends ReturnType<typeof mapStateToProps> {
}
interface IReduxProps {
    settings: ISettings,
}



const Playground = ({ settings }: IProp) => {
    const [difficult, changeDifficult] = useState<keyof ISettings | string>("easyMode")
    const [firstGame, toggleFirstGame] = useState(true)
    const [isGoing, setIsGoing] = useState(false)
    const [arrayBoxes, changeArrayBoxes] = useState<number[][]>([])
    const [computerGoing, changeComputerGoing] = useState(null)
    const { field, delay } = settings[difficult]
    const startTheGame = () => {
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

    const toggleBox = (x, y) => {
        if (isGoing) {
            changeArrayBoxes(prev => {
                let newState = [...prev]
                newState[x][y] = 1
                return newState
            })
            console.log(x, y)
        }
    }
    function randomInteger(min, max) {
        let rand = Math.floor(Math.random() * (max - min + 1)) + min;
        console.log(rand);

        return rand
    }

    const aviableRows = (param) => {
        let rows = []
        let array = [...arrayBoxes]
        array.map((row, i) => row.filter(col => col === param).length !== 0 && rows.push(i))
        return rows
    }
    const aviableCols = (param, row) => {
        let cols = []
        console.log(row)
        let copyRow = [...row]
        copyRow.map((col, i) => col === param && cols.push(i))
        return cols
    }

    const computerToggleBox = () => {
        let x
        let y
        let rows = aviableRows(0)
        x = randomInteger(0, rows.length - 1)
        let cols = aviableCols(0, arrayBoxes[rows[x]])
        y = randomInteger(0, cols.length - 1)
        console.log(x, y)
    }
    const playButtonText = () => {
        if (firstGame && !isGoing) {
            return "Play"
        } else if (isGoing) {
            return "Stop"
        } else {
            return "Play Again"
        }
    }

    const generateArray = () => {
        changeArrayBoxes(() => {
            return Array.from(new Array(field), () => new Array(field).fill(0))
        })
    }
    useEffect(() => {
        generateArray()
    }, [difficult])
    const getStatus = (status) => {
        switch (status) {
            case 0:
                return ""
            case 1:
                return "active"
            case 2:
                return 'man'
            case 3:
                return 'computer'
        }
    }
    return (
        <div className='playground'>
            <div className='status-bar'>
                <button onClick={() => startTheGame()}>{playButtonText()}</button>
                <select value={difficult} disabled={isGoing} onChange={(e: React.ChangeEvent<HTMLSelectElement>): void => changeDifficult(e.currentTarget.value)}>
                    <option value="easyMode">Easy</option>
                    <option value="normalMode">Normal</option>
                    <option value="hardMode">Hard</option>
                </select>
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


const connector = connect(mapStateToProps, null)(Playground)

export { connector as Playground }