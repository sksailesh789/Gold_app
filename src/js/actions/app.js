import {APP_IS_OFFLINE,APP_IS_ONLINE} from "./types"

const onStatusChange = dispatch => () => {
    const isOnline = navigator.onLine;
    console.log(isOnline,'iiiissssoooonnnlline')
    const action = isOnline ? 
        {type: APP_IS_ONLINE , isOnline}:
        {type: APP_IS_OFFLINE , isOnline}

    dispatch(action);
}

export const listenToConnectionChanges = () => dispatch => {
    const connectionHandler = onStatusChange(dispatch);

    window.addEventListener('online' , connectionHandler)
    window.addEventListener('offline' , connectionHandler)

    return () => {
        window.removeEventListener('online' , connectionHandler)
        window.removeEventListener('offline' , connectionHandler)
    }
}