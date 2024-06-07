export const setItem =(key, data) => {
    try {
        localStorage.setItem(key, data)
    } catch (error) {
        console.log(" Error from persistance file");
    }
}

export const getItem = (key) => {
    try {
     return  localStorage.getItem(key) 
    } catch (error) {
       console.log(" Error from getting items"); 
    }
}

export const removeItem = (key) => {
    try {
         localStorage.removeItem(key)
    } catch (error) {
        console.log("Error from removing item");
    }
}