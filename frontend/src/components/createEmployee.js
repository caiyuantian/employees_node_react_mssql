import React from 'react';
import store from '../store'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import actionTypes from '../actionTypes'
import { onCreateEmployee } from '../actions'

class CreateEmployee extends React.Component {
    componentDidMount() {
        store.dispatch({ type: actionTypes.CREATE_EMPLOYEE_FETCH_ROLES_ASYNC});
        this.onValidateFields = this.onValidateFields.bind(this);
    }

    onValidateFields(EmployeeNumber, FirstName, LastName, Extension) {
        if(!EmployeeNumber) {
            alert("please input Employee Number")
            return false;
        }
        if(!FirstName) {
            alert("please input First Name")
            return false;
        }
        if(!LastName) {
            alert("please input Last Name")
            return false;
        }
        if(Extension > 32767) {
            alert("Extension number should be < 32768")
            return false;
        }
        return true;
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
                            <td><input type="number" style={{width:60}} id="EmployeeNumber"></input></td>
                        </tr>
                        <tr>
                            <td>First Name:</td>
                            <td><input type="text"  style={{width:100}} id="FirstName"></input> </td>
                        </tr>
                        <tr>
                            <td>Last Name:</td>
                            <td><input type="text"  style={{width:100}} id="LastName"></input> </td>
                        </tr>
                        <tr>
                            <td>Extension:</td>
                            <td><input type="number" min="0" max="32768" style={{width:60}} id="Extension"></input></td>
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
                                    var answer = window.confirm("Confirm?")
                                    let isCheck = this.onValidateFields(
                                        document.getElementById("EmployeeNumber").value,
                                        document.getElementById("FirstName").value,
                                        document.getElementById("LastName").value,
                                        document.getElementById("Extension").value,
                                    );
                                    if (answer && isCheck) {
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