import link from '../utils/link';


export const setAuthData = (payload) => {
    return {
        type : 'SET_AUTH_DATA',
        payload
    }
}

export const clearAuthData = () => {
    return {
        type : 'CLEAR_AUTH_DATA'
    }
}

export const showState = () => {
    return {
        type : 'SHOW_STATE'
    }
}

export const addItem = (payload) => {
    
    return {
        type : 'ADD_ITEM',
        payload
    }
}

export const clearBoard = () => {
    return {
        type : 'CLEAR_BOARD'
    }
}
export const submitStarted = () => {
    return {
        type : 'SUBMIT_STARTED'
    }
}

export const submitFinished = () => {
    return {
        type : 'SUBMIT_FINISHED'
    }
}
export const removeItem = (payload) => {
    return {
        type : 'REMOVE_ITEM',
        payload
    }
}

export const setEntries = (payload) => {
    return {
        type : 'SET_ENTRIES',
        payload
    }
}

export const setSupplier = (payload) => {
    return {
        type : 'SET_SUPPLIER',
        payload
    }
}

export const loadEntries = () => dispatch => {
    // console.log('Please')

        console.log(`${link.base}entries/`)

        fetch(`${link.base}entries/`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            dispatch(setEntries(data))
        })
        .catch(err => console.log(err))
    }
