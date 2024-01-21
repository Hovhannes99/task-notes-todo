import SecureLS from "secure-ls";


export const getLocalStorage = (key) => {
    if (typeof window !== 'undefined') {
        let ls = new SecureLS({encodingType: 'rc4', isCompression: false});
        try {
            const serializedData = ls.get(key);
            if (serializedData === null) {
                return undefined;
            }
            return JSON.parse(serializedData);
        } catch (error) {
            console.error('Error loading data from localStorage:', error);
            return undefined;
        }
    }
}

export const setLocalStorage = (key, data) => {
    if (typeof window !== 'undefined') {
        let ls = new SecureLS({encodingType: 'rc4', isCompression: false});
    try {
        const serializedData = JSON.stringify(data);
        ls.set(key, serializedData);
    } catch (error) {
        console.error('Error uploading data to localStorage:', error);
    }
    }
}

export const hasChanges = (arr1, arr2) =>{
    if (arr1?.length !== arr2?.length) return false;
    return arr1?.reduce((isEqual, obj1, index) => {
        if (!isEqual) {
            return false;
        }
        const obj2 = arr2[index];
        for (const key in obj1) {
            if (obj1[key] !== obj2[key]) {
                return false;
            }
        }
        return true;
    }, true);
}

