import React from 'react';
import store from '../store'
import { connect } from 'react-redux'
import actionTypes from '../actionTypes'

class DisplayEmployee extends React.Component {

    componentDidMount() {
        let pathname = this.props.location.pathname
        let EmployeeID = pathname.substring(pathname.lastIndexOf('/') + 1);
        store.dispatch({ type: actionTypes.FETCH_EMPLOYEE_FOR_DISPLAY_ASYNC, EmployeeID: EmployeeID });
    }
    render() {
        let { employeeForDisplay} = this.props;

        console.log(employeeForDisplay);

        let detailItems = '';
        if (!!employeeForDisplay) {

            detailItems = (
                <table>
                    <tbody>
                        <tr>
                            <td>Employee ID: </td>
                            <td><input type="text" id="EmployeeID" value={employeeForDisplay.EmployeeID} disabled="true"></input></td>
                        </tr>
                        <tr>
                            <td>Employee Number:</td>
                            <td><input id="EmployeeNumber" value={employeeForDisplay.EmployeeNumber} disabled="true"></input></td>
                        </tr>
                        <tr>
                            <td>First Name:</td>
                            <td><input id="FirstName" value={employeeForDisplay.FirstName} disabled="true"></input> </td>
                        </tr>
                        <tr>
                            <td>Last Name:</td>
                            <td><input id="LastName" value={employeeForDisplay.LastName} disabled="true"></input> </td>
                        </tr>
                        <tr>
                            <td>Extension:</td>
                            <td><input id="Extension" value={employeeForDisplay.Extension} disabled="true"></input></td>
                        </tr>
                        <tr>
                            <td>RoleName:</td>
                            <td><input id="Extension" value={employeeForDisplay.Role !== null?employeeForDisplay.Role.RoleName:null} disabled="true"></input></td>
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
    let { employeeForDisplay } = state
    return {
        employeeForDisplay: employeeForDisplay
    };
}

export default connect(mapStateToProps)(DisplayEmployee)