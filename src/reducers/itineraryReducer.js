import {ITINERARY_NOT_FOUND, ITINERARY_PENDING, ITINERARY_FOUND} from '../actions/ActionTypes'

const INITIAL_STATE = {
    loading: true,
    itineraryData: {
        id: '',
        groupPin: '',
        fullData: '',
        dailyData: [
            {
                date: null, 
                location: '', 
                activities: [{ time: null, description: ''}]
            }
        ]
    },
    error: ''
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case ITINERARY_FOUND: 
            return {...state, itineraryData: action.payload, loading: false};
        case ITINERARY_NOT_FOUND: 
            return {...state, ...INITIAL_STATE, error: action.payload, loading: false};
        default:
            return state;
    }
}