import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { onChangeFilter, onChangePageSize, onDeleteEmployee } from '../actions'
import actionTypes from '../actionTypes'
import store from '../store'
import { ListEmployees } from './listEmployees'


class Employee extends React.Component {
    componentDidMount() {
        store.dispatch({ type: actionTypes.FETCH_EMPLOYEES_ASYNC, query: this.props.location.search, filters: this.props.filters });
    }

    render() {
        let { employees, pageInfo, onChangeFilter, onChangePageSize, onDeleteEmployee, filters } = this.props;
        let query = this.props.location.search;

        //let queryParams = querySearch(this.props.location.search);
        function getParameter(search, paramName) {
            var searchString = search.substring(1),
                i, val, params = searchString.split("&");

            for (i = 0; i < params.length; i++) {
                val = params[i].split("=");
                if (val[0] === paramName) {
                    return val[1];
                }
            }
            return null;
        }
        let locationPathname = this.props.location.pathname;
        let orderby = getParameter(this.props.location.search, 'orderby');
        //console.log("currentUrl"+currentUrl)

        //console.log("store.getState()="+JSON.stringify(store.getState()));

        return (
            <div>
                <div id='left'>
                    <ListEmployees employees={employees} pageInfo={pageInfo} onChangeFilter={onChangeFilter}
                        onChangePageSize={onChangePageSize} onDeleteEmployee={onDeleteEmployee}
                        locationPathname={locationPathname} orderby={orderby} query = {query} filters={filters} />
                </div>
            </div>
        );
    }
}

function keySort(target) {
    const newObj = {}
    if (!!target) {
        Object.keys(target).sort().map(key => newObj[key] = target[key])
    }
    return newObj
}
//console.log(JSON.stringify(keySort(a)) === JSON.stringify(keySort(b)))

const mapStateToProps = (state) => {
    console.log("state="+JSON.stringify(state))
    let { employees, pageInfo, filters } = state;
    return {
        employees: employees, pageInfo: pageInfo, filters: filters
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onChangePageSize: bindActionCreators(onChangePageSize, dispatch),
        onDeleteEmployee: bindActionCreators(onDeleteEmployee, dispatch),
        onChangeFilter: bindActionCreators(onChangeFilter, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Employee)