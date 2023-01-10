
// Initial State incase there is no current state
const initState = {
    tasks: [],
    filtered_tasks: null,
    notes: [],
    filtered_notes: null,
    categories: [{
            name: "Personal",
            color: "blue",
        },{
            name: "Bussiness",
            color: "purple",
        },{
            name: "Important",
            color: "red"
    }],
}

// This function generates a function that 
// returns the updated state
const actionMap = () => {
    return (state, action) => {
        // The updated state
        return {
            ...state,
            [action.type]: action.payload,
        }
    }
}

// My reducer calls actionMap which returns a function to the handler
function reducer(state = initState, action) {
    const handler = actionMap();
    return handler ? handler(state, action) : state;
}

export default reducer;