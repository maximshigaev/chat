export const handleKeyDown = (callback) => (evt) => {
    if (evt.keyCode === 13) {
        callback();
    }
}

export const getErrorMessage = (type, entities) => {
    const entity = entities && entities[0].toLowerCase() + entities.slice(1, entities.length - 1);

    switch (type) {
        case 'list':
            return `We are sorry. ${entities} aren't available now. Please, reload the page.`;
        case 'create':
        case 'delete':
        case 'rename':
            return `We are sorry. It is impossible to ${type} a ${entity} now. Please, reload the page.`;
        case 'setFavourite':
            return `We are sorry. It is impossible to set a favourite channel now. Please, reload the page.`;
        case 'login':
        case 'logout':
        case 'signup':
            return `We are sorry. It is impossible to ${type} now. Please, reload the page.`;
        case 'friend':
            return `We are sorry. It is impossible to set a friend now. Please, reload the page.`;
        case 'myProfile':
            return `We are sorry. It is impossible to edit the profile now. Please, reload the page.`;
        default:
            return `We are sorry. It is impossible to perform the operation now. Please, reload the page.`;
    }
} 
