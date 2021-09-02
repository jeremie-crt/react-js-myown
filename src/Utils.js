export function createMarkup(text) {
    return {__html: text}
}

export function reduceTextLength(text, start, end) {
    return text.substr(0, 150)
}

export function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}