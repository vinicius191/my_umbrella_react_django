export const updateObject = (oldObject, updatedObject) => {
    return {
        ...oldObject,
        ...updatedObject
    }
}

export const getCsrfToken = () => {
    let csrf = document.cookie.match('(^|;)\\s*csrftoken\\s*=\\s*([^;]+)');
    return csrf ? csrf.pop() : '';
}

export const strAuthHandler = (data, step) => {
    if(data !== null) {
        let error = new Array();
        if(data.hasOwnProperty('username')) {
            error.push("username: " + data.username[0]);
        }
        if(data.hasOwnProperty('password')) {
            error.push("password: " + data.password[0]);
        }

        return error.join('\n');
    } else {
        return "Error to " + step;
    }
}