import AsyncStorage from '@react-native-community/async-storage';
import uuid from 'react-native-uuid';

export const DB_NAME = '@Jako-storage';
export const SESSION = 'session';

/**
 * This class allows to interact with the AsyncStorage using simple function and manipulating the data,
 * this works as a persisting unit for the async storage.
 * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
 */
class StorageService {
    /**
     * This function allows to read the data directly from the async storage using an entity name
     * as unique key.
     * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
     * @param entityName
     * @param criteria
     * @param callBack
     * @returns {Promise<*>}
     */
    getEntityData = async (entityName, criteria=false, callBack) => {
        try {
            const storageName = `${DB_NAME}:${entityName}`;
            const data = await AsyncStorage.getItem(storageName, callBack);
            if(criteria !== false) {
                return this.filterData(JSON.parse(data), criteria);
            } else {
                return JSON.parse(data);
            }
        } catch (e) {
            return [];
        }
    };

    /**
     * This function allows to filter the data using a simple criteria (equals to).
     * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
     * @param data
     * @param criteria
     * @returns {...*[]}
     */
    filterData = (data, criteria={}) => {
        const criteriaKeys = Object.keys(criteria);
        let resultData = [...data];
        criteriaKeys.forEach(key => {
            resultData = resultData.filter(item => item[key] === criteria[key]);
        });
        return resultData;
    };

    /**
     * This function allows to persist or store the data into an specific position inside the storage.
     * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
     * @param entityName
     * @param data
     * @param callback
     * @returns {Promise<boolean>}
     */
    persistEntity = async (entityName, data, callback) => {
        try {            
            await AsyncStorage.setItem(`${DB_NAME}:${entityName}`, JSON.stringify(data), callback);
            return true;
        } catch (e) {
            console.log("Error writing: ", e);
            return false;
        }
    };

    /**
     * This function allows to storage a new record, automatically the storage service generates a new unique code
     * for the record
     * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
     * @param entityName
     * @param data
     * @param code
     * @param callback
     * @returns {Promise<Promise<*> | Promise<*>>}
     */
    addRecord = async (entityName, data, code=null, callback) => {
        if(!code) {
            data.code = uuid.v1(); // first we generate a new unique code for the record.
        } else {
            data.code = code;
        }
        return new Promise((resolve, reject) => {
            const onError = (object, type) => {
                reject({
                    error   : true,
                    type    : type,
                    object  : object,
                });
            };

            try {
                // Now we fetch the current data from the storage.
                this.getEntityData(entityName, callback)
                    .then(currentRecords => {                    
                        const records = currentRecords? currentRecords : [];
                        records.push(data); // Then we add the new record.
                        this.persistEntity(entityName, records, callback) // then we save all the storage key with the new data.
                            .then((response) => {
                                if(response) {
                                    resolve({
                                        saved : true,
                                        record: data,
                                    });
                                } else {
                                    reject({
                                        saved : false,
                                        record: false,
                                    });
                                }
                            })
                            .catch(response => {
                                onError(response, "persist");
                            });
                    })
                    .catch((response) => {
                        onError(response, "data");
                    });
            } catch (e) {
                onError(e, "exception");
            }
        });
    };

    /**
     * This function allows to update a specific record inside the storage.
     * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
     * @param entityName
     * @param currentData
     * @param callback
     * @returns {Promise<any> | Promise<*>}
     */
    updateRecord = (entityName, currentData, callback) => {
        return new Promise((resolve, reject) => {
            const onError = (object, type) => {
                reject({
                    error   : true,
                    type    : type,
                    object  : object,
                });
            };
            try {
                this.getEntityData(entityName, callback)
                    .then(currentRecords => {
                        const records = currentRecords? currentRecords : [];
                        if(records.length === 0) {
                            reject(false);
                        } else {
                            const elementIndex = records.findIndex(element => element.code === currentData.code);
                            if(elementIndex >= 0) {
                                records[elementIndex] = currentData;
                                this.persistEntity(entityName, records, callback)
                                    .then((response) => {
                                        if(response) resolve(true);
                                        else reject(false);
                                    })
                                    .catch(response => {
                                        onError(response, "persist");
                                    });
                            } else {
                                reject(false)
                            }
                        }
                    })
                    .catch((response) => {
                        onError(response, "data");
                    });
            } catch (e) {
                onError(e, "exception");
            }
        });
    };

    /**
     * This function allows to remove a specific record from the storage.
     * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
     * @param entityName
     * @param code
     * @param callback
     * @returns {Promise<any> | Promise<*>}
     */
    deleteRecord(entityName, code, callback) {
        return new Promise((resolve, reject) => {
            const onError = (object, type) => {
                reject({
                    error   : true,
                    type    : type,
                    object  : object,
                });
            };
            try {
                this.getEntityData(entityName, callback)
                    .then(currentRecords => {
                        let records = currentRecords? currentRecords : [];
                        if(records.length === 0) {
                            reject(false);
                        } else {
                            const currentElementsTotal = records.length;
                            records = records.filter(element => element.code !== code);
                            const newTotal = records.length;
                            if(currentElementsTotal !== newTotal) {
                                this.persistEntity(entityName, records, callback)
                                    .then((response) => {
                                        if(response) resolve(true);
                                        else reject(false);
                                    })
                                    .catch(response => {
                                        onError(response, "persist");
                                    });
                            } else {
                                reject(false);
                            }
                        }
                    })
                    .catch((response) => {
                        onError(response, "data");
                    });
            } catch (e) {
                onError(e, "exception");
            }
        });
    }

    /**
     * This function allows to show all the available entities inside the main storage.
     * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
     * @returns {*}
     */
    showEntities() {
        return AsyncStorage.getAllKeys();
    }

    /**
     * This function allows to remove a key from the main storage (Remove an entity).
     * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
     * @param entityName
     * @returns {Promise<boolean>}
     */
    deleteEntity = async (entityName) => {
        const storageName = `${DB_NAME}:${entityName}`;
        try {
            await AsyncStorage.removeItem(storageName);
            return true;
        } catch (e) {
            return false;
        }
    };

    /**
     * This function empty the data inside a storage key, but it does not remove the key.
     * @author Jorge Alejandro Quiroz Serna <jakop.box@gmail.com>
     * @param entityName
     */
    clearEntity = (entityName) => {
        try {
            return (new Promise((resolve, reject) => {
                this.persistEntity(entityName, [])
                .then(() => {
                    console.log(`Entity ${entityName} cleared!`)
                    resolve();
                })
                .catch(() => {
                    console.log(`Cannot clear entity ${entityName}`)
                    reject();
                });
            }))
        } catch (e) {
            console.log(`Cannot clear entity ${entityName}`, e);
        }
    };
}

export default new StorageService();