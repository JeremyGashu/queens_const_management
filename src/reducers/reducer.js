//userAuthType
//entries
//currentlyAdding
//isLoggedIn
const initState = {
	authData: { type: null, user: {authType : 'USER'} },
	entries: [],
	onBoard: { entries: [], supplier: '5f6aebaaee2db900171ee583' },
	// currentlyAdding : {},
    isLoggedIn: false,
    submitting : false,
    entryImage : null
};

//loadEntries (started, finished)
//login(success)
//logout
//addItem
//deleteItem
//approveEntry
//setSupplier

const reducer = (state = initState, action) => {
	switch (action.type) {
        case 'SHOW_STATE':
            console.log(state)
            return state
        case 'SET_ENTRY_IMAGE':
            console.log(action.payload);
            
            return {
                ...state,
                entryImage : action.payload
            }
		case 'SET_AUTH_DATA':
			return {
				...state,
                authData: action.payload,
                isLoggedIn : true
            };
        case 'CLEAR_AUTH_DATA':
            return {
                ...state,
                authData: { type: null, user: {authType : 'USER'} },
            }
        case 'CLEAR_BOARD':
            return {
                ...state,
                onBoard: {...state.onBoard, entries: [] },
            }
		case 'ADD_ITEM':
			return {
				...state,
				onBoard: { ...state.onBoard, entries: [...state.onBoard.entries, action.payload] },
            };
        case 'REMOVE_ITEM':
            let newItemList = state.onBoard.entries.filter(item => item.id !== action.payload)
            return {
                ...state,
                onBoard : { ...state.onBoard, entries: newItemList }
            }
        case 'SET_ENTRIES':            
            return {
                ...state,
                entries : action.payload
            }
            
        case 'SET_SUPPLIER':
            return {
                ...state,
                onBoard: { ...state.onBoard, supplier : action.payload },
            }
        case 'SUBMIT_STARTED':
            return {
                ...state,
                submitting : true
            }
        case 'SUBMIT_FINISHED':
            return {
                ...state,
                submitting : false
            }
        case 'LOG_OUT':
            return {
                ...state,
                isLoggedIn : false,
                authData: { type: null, user: null }
            }
        
		default:
			return state;
	}
};

export default reducer