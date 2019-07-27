import { put, takeEvery, call } from 'redux-saga/effects'
import actionTypes from '../actionTypes'
import config from '../config'


export function* clickPageNoAsync(action) {
    console.log("action=" + JSON.stringify(action))
    let pageSize = action.pageSize;
    let pageNo = action.pageNo;
    let queryString = '?pageSize=' + pageSize + '&PageNo=' + pageNo
    try {
        //console.log('http://localhost:5000/api/v1/employees' + queryString);
        const response = yield call(fetch, config.backendAddress+'/api/v1/employees' + queryString);
        const employees = yield call([response, 'json']);
        if (!!employees) {
            yield put({ type: actionTypes.FEATCH_EMPLOYEES_OK, employees: employees });
        }
        //return data[0].usernameName;
    } catch (e) {
        console.log(e);
        //return null;
    }
}

export function* changePageSizeAsync(action) {
    try {
        if (action.pageSize > 0) {
            let queryStr = '?pageSize=' + action.pageSize + '&pageNo=' + action.pageNo;
            console.log(config.backendAddress+'/api/v1/employees' + queryStr);
            const response = yield call(fetch, config.backendAddress+'/api/v1/employees' + queryStr);
            //const data = response.json();
            const employees = yield call([response, 'json']);
            //console.log(JSON.stringify(employees));
            if (!!employees) {
                yield put({ type: actionTypes.FEATCH_EMPLOYEES_OK, employees: employees });
            }
        } else {
            return;
        }

        //return data[0].usernameName;
    } catch (e) {
        console.log(e);
        //return null;
    }
}



export function* changeFilterAsync(action) {
    let { filters } = action;
    if (action.value === '') {
        try {
            delete filters[action.field]
        } catch (error) {
        }
    } else {
        switch (action.field) {
            case 'employeeName':
                filters = { ...filters, employeeName: action.value };
                break;
            case 'EmployeeNumber':
                filters = { ...filters, EmployeeNumber: action.value };
                break;
            case 'DateJoined':
                filters = { ...filters, DateJoined: action.value };
                break;
            case 'Extension':
                filters = { ...filters, Extension: action.value };
                break;
            case 'RoleName':
                filters = { ...filters, RoleName: action.value };
                break;
            default:
                break;
        }
    }

    yield put({ type: actionTypes.CHANGE_FILTER, filters: filters })
    yield put({ type: actionTypes.FETCH_EMPLOYEES_ASYNC, query: action.query, filters: filters })
}


export function* watchEmployeePage() {
    yield takeEvery(actionTypes.CLICK_PAGENO_ASYNC, clickPageNoAsync);
    yield takeEvery(actionTypes.CHANGE_PAGE_SIZE_ASYNC, changePageSizeAsync);
    yield takeEvery(actionTypes.CHANGE_FILTER_ASYNC, changeFilterAsync);
}