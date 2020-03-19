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