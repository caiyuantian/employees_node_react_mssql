import React from 'react';
import store from '../store'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import actionTypes from '../actionTypes'
import { onCreateEmployee } from '../actions'

class CreateEmployee extends React.Component {
    componentDidMount() {
        store.dispatch({ type: actionTypes.CREATE_EMPLOYEE_FETCH_ROLES_ASYNC});
    }
    render() {
        let { roles, onCreateEmployee } = this.props;

        let roleList = '';
        let detailItems = '';
        if (!!roles) {
            //console.log(JSON.stringify(roles))
            roleList = roles.map(role => (
                <option key={role.RoleID} value={role.RoleID} text={role.RoleName}>{role.RoleName}</option>
            ));
            detailItems = (
                <table>
                    <tbody>
                        <tr>
                            <td>Employee Number:</td>
                            <td><input id="EmployeeNumber"></input></td>
                        </tr>
                        <tr>
                            <td>First Name:</td>
                            <td><input id="FirstName"></input> </td>
                        </tr>
                        <tr>
                            <td>Last Name:</td>
                            <td><input id="LastName"></input> </td>
                        </tr>
                        <tr>
                            <td>Extension:</td>
                            <td><input id="Extension"></input></td>
                        </tr>
                        <tr>
                            <td>RoleName:</td>
                            <td>
                                <select id="RoleID">
                                    <option value=''></option>
                                    {roleList}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <button onClick={() => {
                                    //alert(["Employee record updated!", "test"]);
                                    var answer = window.confirm("Save changes?")
                                    if (answer) {
                                        return onCreateEmployee(
                                            document.getElementById("EmployeeNumber").value,
                                            document.getElementById("FirstName").value,
                                            document.getElementById("LastName").value,
                                            document.getElementById("Extension").value,
                                            document.getElementById("RoleID").value,
                                        )
                                    }
                                }}>Create</button>

                            </td>
                        </tr>
                    </tbody>
                </table>);
        }
        return (
            <div id="employee-detail">
                {detailItems}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    let { roles } = state
    return {
        roles: roles
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCreateEmployee: bindActionCreators(onCreateEmployee, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEmployee)