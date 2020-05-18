let initialState = {
    name: 'Prad',
    email: '',
    phone: '',
}


const userReducer = (state=initialState, action) => {
    switch(action.type){
        case 'UPDATE_USER_DATA':
            return {
                ...state,
                ...action.data
            }
        default: 
            return state
    }
}

export default userReducer;