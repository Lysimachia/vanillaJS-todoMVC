export const cloneDeep = (obj) => {
    return JSON.parse(JSON.stringify(obj))
};

export const getTimeFormat = (str) => {
    const date = new Date(str);
    const hour = date.getHours().toString();
    const minutes = date.getMinutes().toString();
    return `${hour.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
}