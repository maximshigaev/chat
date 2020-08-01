export const handleKeyDown = (callback) => (evt) => {
    if (evt.keyCode === 13) {
        callback();
    }
}
