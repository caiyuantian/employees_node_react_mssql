import actionTypes from '../actionTypes'


export function onUpdateEmployee(EmployeeID, EmployeeNumber, FirstName, LastName, Extension, RoleID) {
  return {
    type: actionTypes.UPDATE_EMPLOYEE_ASYNC,
    EmployeeID: EmployeeID,
    EmployeeNumber: EmployeeNumber,
    FirstName: FirstName,
    LastName: LastName,
    Extension: Extension,
    RoleID: RoleID
  }
}

export function onCreateEmployee(EmployeeNumber, FirstName, LastName, Extension, RoleID) {
  return {
    type: actionTypes.CREATE_EMPLOYEE_ASYNC,
    EmployeeNumber: EmployeeNumber,
    FirstName: FirstName,
    LastName: LastName,
    Extension: Extension,
    RoleID: RoleID
  }
}


export function onClickPageNo(pageSize, pageNo) {
  return {
    type: actionTypes.CLICK_PAGENO_ASYNC,
    pageSize,
    pageNo
  }
}

export function onChangePageSize(pageSize, pageNo) {
  return {
    type: actionTypes.CHANGE_PAGE_SIZE_ASYNC,
    pageSize,
    pageNo
  }
}

export function onDeleteEmployee(EmployeeID, pageSize, pageNo) {
  return {
    type: actionTypes.ON_CLICK_DELETE_EMPLOYEE_ASYNC,
    EmployeeID: EmployeeID,
    pageSize: pageSize,
    pageNo: pageNo
  }
}

export function onChangeFilter(query, filters, field, value) {
  return {
    type: actionTypes.CHANGE_FILTER_ASYNC,
    query, 
    filters, 
    field,
    value
  }
}

