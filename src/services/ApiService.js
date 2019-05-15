import {API_SERVER} from 'react-native-dotenv';
import { consoleError } from '../utils/functions';

/**
 * This service allows to execute simple api fetchs
 *
 * @class ApiService
 */
class ApiService {

    /**
     * This function allows to execute a post request.
     *
     * @param {*} path
     * @param {*} data
     * @returns
     * @memberof ApiService
     */
    doPost(path, data) {
        data.method = "POST";
        return this.doRequest(path, data, "POST", {
            // "Content-type": "text/plain",
            "Content-type": "application/json",
        });
    }

    /**
     * This function allows to execute a get request.
     *
     * @param {*} path
     * @returns
     * @memberof ApiService
     */
    doGet(path) {
        return this.doRequest(path);
    }

    /**
     * This function allows to execute a simple javascript request.
     *
     * @param {*} path
     * @param {*} [data={}]
     * @param {*} [headers={}]
     * @returns
     * @memberof ApiService
     */
    doRequest(path, data={}, method="GET", headers={}) {
        return new Promise((resolve, reject) => {
            const url = `${ API_SERVER }${path}`;
            fetch(url, {
                method,
                headers,
                body : JSON.stringify(data),
            })
            .then(response => {
                try {
                    return response.json()
                } catch(error) {
                    consoleError('Api', error);
                    consoleError('Api-response: ', response);
                    reject(response);
                }
            })
            .then(response => {
                resolve(response);
            })
            .catch(response => {
                reject(response);
            });
        });
    }

    uploadFile(path, formData) {
        return new Promise((resolve, reject) => {
            const url = `${ API_SERVER }${path}`;
            fetch(url, {
                method : "POST",
                body : formData,
            })
            .then(response => response.json())
            .then(response => resolve(response))
            .catch(response => reject(response));
        });
    }
};

export const Api = new ApiService();