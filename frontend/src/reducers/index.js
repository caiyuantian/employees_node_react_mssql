import actionTypes from '../actionTypes'

const initialState = {
    employees: [],
    roles: [],
    selectedEmployee: {}
}

const rootReducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.FEATCH_EMPLOYEES_OK:
            let newstate =  { ...state, employees: action.employees.employees, pageInfo: action.employees.pageInfo };
            console.log("newstate=" + JSON.stringify(state))
            return newstate;
        case actionTypes.FEATCH_ROLES_OK:
            return { ...state, roles: action.roles };
        case actionTypes.FEATCH_SELECTED_EMPLOYEE_OK:
            return { ...state, selectedEmployee: action.selectedEmployee };
        case actionTypes.FEATCH_EMPLOYEE_TOBE_CHANGE_OK:
            return { ...state, employeeTobeChange: action.employeeTobeChange };
        case actionTypes.FEATCH_EMPLOYEE_FOR_DISPLAY_OK:
            return { ...state, employeeForDisplay: action.employeeForDisplay };
        case actionTypes.CHANGE_FILTER:
            return { ...state, filters: action.filters };
        default:
            return state;
    }
}

export default rootReducer;