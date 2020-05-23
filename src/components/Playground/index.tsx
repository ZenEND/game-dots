import React from 'react'
import './style.scss'
import { connect, MapStateToProps } from 'react-redux'
import { ISettings } from "@interfaces/settings"

interface IProp extends ReturnType<typeof mapStateToProps>{
}

const Playground = ({settings}: IProp) => {
    return (
    <div className='playground'>
        <div>
            <button>Play</button>
        </div>
        <div className="boxes">
            {new Array(25).fill("").map((item,i) => (
                <div className='box' onClick={() => console.log(i)}>
                </div>
            ))}
        </div>
    </div>
    )
}

const mapStateToProps = state => {
    return{
        settings: state.settings

    }
}


const connector = connect(mapStateToProps, null)(Playground)

export { connector as Playground }