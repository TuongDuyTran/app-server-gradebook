
export let queryString = function(params) {
    return new URLSearchParams(params)
}

export let getValueInArrObjKey = function(array,key,value) {
    let index = array.findIndex(x => x[key] == value);
    return index > -1 ? array[index] : {};
}

export let formatDate = function (workingTime) {
    if (workingTime && workingTime === 0)
        return null;
    let dt = new Date(workingTime);
    let template = `${
        dt.getFullYear().toString().padStart(4, '0')}-${
        (dt.getMonth()+1).toString().padStart(2, '0')}-${
        dt.getDate().toString().padStart(2, '0')} ${
        dt.getHours().toString().padStart(2, '0')}:${
        dt.getMinutes().toString().padStart(2, '0')}:${
        dt.getSeconds().toString().padStart(2, '0')}`;
    return template;
}


