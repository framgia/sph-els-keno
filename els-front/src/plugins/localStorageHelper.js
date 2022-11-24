export const getUserToken = () =>{
    return localStorage.getItem('token') ? window.atob(localStorage.getItem('token')) : ''
}

export const setUserToken = (value) => {
    localStorage.setItem('token', window.btoa(value))
}

export const getUserType = () =>{
    return localStorage.getItem('access_type') ? window.atob(localStorage.getItem('access_type')) : ''
}

export const setUserType = (value) => {
    localStorage.setItem('access_type', window.btoa(value))
}
