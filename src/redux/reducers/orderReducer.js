let initialState = {
    user: {},
    price: {},
    items: [],
    address: {},
    paymentId: ''
}


const orderReducer = (state=initialState, action) => {
    switch(action.type){
        case 'UPDATE_ORDER_ITEMS':
            return {
                ...state,
                items: action.data.items,
                price: action.data.price
            }
        case 'UPDATE_ORDER_ADDRESS':
            return {
                ...state,
                address: action.data
            }
        default: 
            return state
    }
}


export default orderReducer;