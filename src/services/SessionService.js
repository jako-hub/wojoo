import AsyncStorageService, { SESSION } from "./AsyncStorageService";
const defaultState = {
    logged          : false,
    reading         : true,
    data            : null,
};
const SESSION_CODE = 'user-session';
/**
 * This function allows to read the entire session stack from the async storage
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @returns {Promise<any> | Promise<*>}
 */
export const readSession = () => {
    return (new Promise((resolve, reject) => {
        AsyncStorageService.getEntityData(SESSION, {
            code : SESSION_CODE,
        })
            .then(response => {
                let [session] = response;
                if(!session) {
                    session = defaultState;
                    session.isNewSession = true;
                }
                resolve(session);
            })
            .catch(response => {
                reject(response);
                console.log("error reading the session!", response);
            });
    }));
};

/**
 * This function allows to Storage in session any key
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param key
 * @param value
 * @returns {Promise<any> | Promise<*>}
 */
export const writeInSession = (key, value) => {
    return (new Promise((resolve, reject) => {
        readSession()
            .then(session => {
                session[key] = value;
                if(session.isNewSession) { // If is the first time we create the session.
                    delete session.isNewSession;
                    AsyncStorageService.addRecord(SESSION, session, SESSION_CODE)
                        .then(response => {
                            resolve(response.saved);
                        })
                        .catch(error => {
                            reject(error);
                        })
                } else {
                    AsyncStorageService.updateRecord(SESSION, session)
                        .then(response => {
                            resolve(response);
                        })
                        .catch((response) => {
                            console.error("Error updating the session: ", response, session);
                        });
                }
            })
            .catch(error => {
                reject(error);
            });
    }));
};

/**
 * This function allows to Storage in session a lots of keys in a row.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 * @param newData
 * @returns {Promise<any> | Promise<*>}
 */
export const writeAllInSession = (newData={}) => {
    return (new Promise((resolve, reject) => {
        readSession()
            .then(session => {
                session = {
                    ...session,
                    ...newData,
                };
                if(session.isNewSession) { // If is the first time we create the session.
                    delete session.isNewSession;
                    AsyncStorageService.addRecord(SESSION, session, SESSION_CODE)
                        .then(response => {
                            resolve(response.saved);
                        })
                        .catch(error => {
                            reject(error);
                        })
                } else {
                    AsyncStorageService.updateRecord(SESSION, session)
                        .then(response => {
                            resolve(response);
                        })
                        .catch((response) => {
                            console.error("Error updating the session: ", response, session);
                        });
                }
            })
            .catch(error => {
                reject(error);
            });
    }));
};