import { put, takeEvery, call } from 'redux-saga/effects'
import actionTypes from '../actionTypes'
import config from '../config'

export function* fetchEmployeeAsync(action) {
    try {
        let queryStr = action.query;

        let whereStr = '';

        let filters = action.filters;
        if (!!filters) {
            Object.keys(filters).forEach(key => (whereStr=whereStr+"&" + key + "=" + filters[key]));
            whereStr = whereStr.substr(1, whereStr.length-1);
        }
        
        if (queryStr === '') {
            if(!!whereStr) {
                queryStr = '?'+whereStr;
            } else {
                queryStr = ''
            }
        } else {
            if(!!whereStr) {
                queryStr = queryStr+'&'+whereStr;
            }
        }

        const response = yield call(fetch, config.backendAddress+'/api/v1/employees' + queryStr);
        //const data = response.json();
        const employees = yield call([response, 'json']);
        //console.log("employees="+JSON.stringify(employees));
        if (!!employees) {
            yield put({ type: actionTypes.FEATCH_EMPLOYEES_OK, employees: employees });
        }
        //return data[0].usernameName;
    } catch (e) {
        console.log(e);
        //return null;
    }
}

export function* fetchRoleAsync() {
    try {
        const response = yield call(fetch, config.backendAddress+'/api/v1/roles');
        const roles = yield call([response, 'json']);
        if (!!roles) {
            yield put({ type: actionTypes.FEATCH_ROLES_OK, roles: roles });
        }
    } catch (e) {
        console.log(e);
    }
}

export function* watchFetchEmployee() {
    yield takeEvery(actionTypes.FETCH_EMPLOYEES_ASYNC, fetchEmployeeAsync);
    //yield takeEvery('FETCH_EMPLOYEES_ASYNC', fetchRoleAsync);
}