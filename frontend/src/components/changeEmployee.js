import React from 'react';
import store from '../store'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import actionTypes from '../actionTypes'
import { onUpdateEmployee } from '../actions'

class ChangeEmployee extends React.Component {
    constructor(props) {
        super(props);
        this.onValidateFields = this.onValidateFields.bind(this);
    }

    componentDidMount() {
        let pathname = this.props.location.pathname
        let EmployeeID = pathname.substring(pathname.lastIndexOf('/') + 1);
        store.dispatch({ type: actionTypes.FETCH_EMPLOYEE_TOBE_UPDATE_ASYNC, EmployeeID: EmployeeID });
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
        let { employeeTobeChange, roles, onUpdateEmployee } = this.props;

        let roleList = '';
        //console.log(employeeTobeChange);

        if (!!roles) {
            //console.log(JSON.stringify(roles))
            roleList = roles.map(role => (
                <option key={role.RoleID} value={role.RoleID} text={role.RoleName}>{role.RoleName}</option>
            ));
        }

        let detailItems = '';
        if (!!employeeTobeChange) {
            let defaultRoleID = '';
            try {
                defaultRoleID = employeeTobeChange.Role.RoleID;
            } catch (error) {
                console.log(error);
            }

            detailItems = (
                <table>
                    <tbody>
                        <tr>
                            <td>Employee ID: </td>
                            <td><input type="text" id="EmployeeID" defaultValue={employeeTobeChange.EmployeeID}></input></td>
                        </tr>
                        <tr>
                            <td>Employee Number:</td>
                            <td><input type="number" style={{ width: 60 }} id="EmployeeNumber" defaultValue={employeeTobeChange.EmployeeNumber}></input></td>
                        </tr>
                        <tr>
                            <td>First Name:</td>
                            <td><input type="text" style={{ width: 100 }} id="FirstName" defaultValue={employeeTobeChange.FirstName}></input> </td>
                        </tr>
                        <tr>
                            <td>Last Name:</td>
                            <td><input type="text" style={{ width: 100 }} id="LastName" defaultValue={employeeTobeChange.LastName}></input> </td>
                        </tr>
                        <tr>
                            <td>Extension:</td>
                            <td><input type="number" min="0" max="32768" style={{ width: 60 }} id="Extension" defaultValue={employeeTobeChange.Extension}></input></td>
                        </tr>
                        <tr>
                            <td>RoleName:</td>
                            <td>
                                <select id="RoleID" defaultValue={defaultRoleID}>
                                    <option value=''></option>
                                    {roleList}
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                <button onClick={() => {
                                    //alert(["Employee record updated!", "test"]);
                                    let answer = window.confirm("Save changes?")
                                    let isCheck = this.onValidateFields(
                                        document.getElementById("EmployeeNumber").value,
                                        document.getElementById("FirstName").value,
                                        document.getElementById("LastName").value,
                                        document.getElementById("Extension").value,
                                    );
                                    if (answer && isCheck) {
                                        return onUpdateEmployee(
                                            document.getElementById("EmployeeID").value,
                                            document.getElementById("EmployeeNumber").value,
                                            document.getElementById("FirstName").value,
                                            document.getElementById("LastName").value,
                                            document.getElementById("Extension").value,
                                            document.getElementById("RoleID").value,
                                        )
                                    }
                                }}>Confirm</button>

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
    let { employeeTobeChange, roles } = state
    return {
        employeeTobeChange: employeeTobeChange, roles: roles
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        onUpdateEmployee: bindActionCreators(onUpdateEmployee, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangeEmployee)