
export default (store) => (next) => (action) => {
    const state = store.getState();
    // debugger;
    switch(action.type){
        case 'APP_IS_ONLINE':
        case 'APP_IS_OFFLINE': {
            alert('Displaying Notification')
        }
    }
    next(action)
}