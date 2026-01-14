const saveToken = (token:string) => {
    try {
        localStorage.setItem("token", token);
        return true; // Return true if the token is saved successfully
    } catch (e) {
        console.log("Error saving token:", e);
        return false; // Return false if there's an error saving the token
    }
};

const getToken = () => {
    try {
        const token = localStorage.getItem("token");
        if (token) {
            return token; // Return the token if it exists
        } else {
            console.log("No token found");
            return null; // Return null if no token is found
        }
    } catch (error) {
        console.log("Error getting token:", error);
        return null; // Return null if there's an error getting the token
    }
};

const clearToken = () => {
    try {
        localStorage.removeItem("token");
        return true; // Return true if the token is cleared successfully
    } catch (error) {
        console.log("Error clearing token:", error);
        return false; // Return false if there's an error clearing the token
    }
};

export default {
    getToken,
    saveToken,
    clearToken,
};
