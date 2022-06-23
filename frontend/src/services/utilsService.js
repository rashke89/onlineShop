class UtilsService {
    static getLocalStorage = () => {
        if (localStorage.hasOwnProperty("user")) {
            return true
        } else {
            return false
        }
    }
    static logOut = () => {
        if (localStorage.hasOwnProperty("user")) {
            localStorage.removeItem("user")
            return true
        }
        return false

    }
}

export default UtilsService