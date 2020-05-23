export interface ISettings {
    easyMode?: IDifficult,
    hardMode?: IDifficult,
    normalMode?: IDifficult,
}

interface IDifficult {
    field: number,
    delay: number
}