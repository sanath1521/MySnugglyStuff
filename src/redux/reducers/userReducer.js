let initialState = {
    id: '',
    name: '',
    email: '',
    phone: '',
    savedItems: []
}


const userReducer = (state=initialState, action) => {
    switch(action.type){
        case 'UPDATE_USER_DATA':
            return {
                ...state,
                ...action.data
            }
        case 'SAVE_ITEM':
            return{
                ...state,
                savedItems: [
                    ...state.savedItems,
                    action.data
                ]
            }
        default: 
            return state
    }
}

export default userReducer;