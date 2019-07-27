import React from 'react';
import store from '../store'
import { saveState } from '../store/localStorage'

class ListEmployees extends React.Component {

    constructor(props) {
        super(props);
        this.handleLeavePage = this.handleLeavePage.bind(this);
    }

    componentDidMount() {
        window.addEventListener('beforeunload', this.handleLeavePage);
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.handleLeavePage);
    }

    handleLeavePage(e) {
        store.subscribe(() => {
            const state = store.getState();
            saveState(state);
        })
    }

    render() {
        let { employees, pageInfo, onChangePageSize, onChangeFilter, onDeleteEmployee, locationPathname, orderby, query, filters } = this.props;
        let employeeList = null;

        let pageLink = [];
        let pageSize = 5;
        let pageNo = 1;
        let totalPageNo = 1;
        let orderbyStr = ""


        if (orderby !== null) {
            orderbyStr = "&orderby=" + orderby;
        }

        if (typeof pageInfo !== 'undefined' && Object.keys(pageInfo).length !== 0) {
            pageNo = pageInfo.pageNo
            pageSize = pageInfo.pageSize
            totalPageNo = Math.ceil(pageInfo.count / pageSize);
        }

        let currentUrl = locationPathname + "?pageSize=" + pageSize + "&pageNo=" + pageNo;
        if (!!employees && employees.length !== 0) {
            employeeList = employees.map((employee, rowid) => (
                <tr key={employee.EmployeeID}>
                    <td>{(rowid + 1 + (pageNo - 1) * pageSize)}</td>
                    <td><a href={'./employee/' + employee.EmployeeID}>
                        {employee.FirstName} {employee.LastName}</a>
                    </td>
                    <td>{employee.EmployeeNumber}</td>
                    <td>{employee.DateJoined.substr(0, 10)}</td>
                    <td>{employee.Extension}</td>
                    <td>{employee["Role.RoleName"] !== null ? employee["Role.RoleName"] : null}</td>
                    <td><form action={'./changeEmployee/' + employee.EmployeeID}>
                        <button>Change </button>
                    </form>
                    </td>
                    <td><button onClick={() => {
                        var answer = window.confirm("Delete Record?");
                        if (answer) {
                            return onDeleteEmployee(
                                employee.EmployeeID,
                                pageSize,
                                pageNo
                            )
                        }
                    }}>Delete</button></td>
                </tr>
            ));
            //console.log("pageSize:" + pageSize);
            //console.log("totalPageNo:" + totalPageNo);
            for (let i = 0; i < totalPageNo; i++) {
                pageLink.push(
                    <td key={i}>
                        <a href={'./employees?pageSize=' + pageSize + '&pageNo=' + (i + 1) + orderbyStr}> {i + 1} </a>
                    </td>
                );
            }
            //console.log("totalPageNo:" + totalPageNo);
            //console.log("pageLink:" + pageLink);
        }
        return (
            <div>
                <table>
                    <thead>
                        <tr key="header">
                            <th>Row No.</th>
                            <th><a href={currentUrl + "&orderby=employeeName"}>Employee Name</a></th>
                            <th><a href={currentUrl + "&orderby=EmployeeNumber"}>Employee Number</a></th>
                            <th><a href={currentUrl + "&orderby=DateJoined"}>Date Joined</a></th>
                            <th><a href={currentUrl + "&orderby=Extension"}>Extension</a></th>
                            <th><a href={currentUrl + "&orderby=RoleName"}>Role Name</a></th>
                            <th>Change</th>
                            <th>Delete</th>
                        </tr>
                        <tr key="filter">
                            <th></th>
                            <th><input size="15" defaultValue={filters&&!!filters.employeeName?filters.employeeName:"Filter..."} 
                                onFocus={e => e.target.value === "Filter..." ? e.target.value = '' : null}
                                onBlur={e => onChangeFilter(query, filters, "employeeName", e.target.value)}></input></th>
                            <th><input size="10" defaultValue={filters&&!!filters.EmployeeNumber?filters.EmployeeNumber:"Filter..."}
                                onFocus={e => e.target.value === "Filter..." ? e.target.value = '' : null}
                                onBlur={e => onChangeFilter(query, filters, "EmployeeNumber", e.target.value)}></input></th>
                            <th><input size="10" defaultValue={filters&&!!filters.DateJoined?filters.DateJoined:"Filter..."}
                                onFocus={e => e.target.value === "Filter..." ? e.target.value = '' : null}
                                onBlur={e => onChangeFilter(query, filters, "DateJoined", e.target.value)}></input></th>
                            <th><input size="5" defaultValue={filters&&!!filters.Extension?filters.Extension:"Filter..."}
                                onFocus={e => e.target.value === "Filter..." ? e.target.value = '' : null}
                                onBlur={e => onChangeFilter(query, filters, "Extension", e.target.value)}></input></th>
                            <th><input size="15" defaultValue={filters&&!!filters.RoleName?filters.RoleName:"Filter..."}
                                onFocus={e => e.target.value === "Filter..." ? e.target.value = '' : null}
                                onBlur={e => onChangeFilter(query, filters, "RoleName", e.target.value)}></input></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {employeeList}
                    </tbody>
                </table>
                <table>
                    <tbody>
                        <tr key="pages">
                            <td>Pages:</td>
                            {pageLink}
                            <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                            <td>Page Size:</td>
                            <td><input size="2" type="text" id="inputPageSize"
                            defaultValue={!!pageSize?pageSize:5} 
                            onChange={(e) => onChangePageSize(e.target.value, pageNo)}></input></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export { ListEmployees }