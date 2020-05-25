// Return correct status of box
export const getStatus = (status) => {
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


// Return correct button text
export const playButtonText = (firstGame, isGoing) => {
    if (firstGame && !isGoing) {
        return "Play"
    } else if (isGoing) {
        return "Stop"
    } else {
        return "Play Again"
    }
}
