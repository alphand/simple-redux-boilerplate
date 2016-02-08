import superagent from 'superagent';
import config from '../config';

const methods = ['get', 'post', 'put', 'patch', 'del'];

const formatUrl = (path) => {
    const adjustedPath = path[0] !== '/' ? '/' + path : path;
    return '/api' + adjustedPath;
}

class APIClient {
    constructor (req) {
        methods.forEach((method) => {
            this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
                const request = superagent[method](formatUrl(path));

                if(params) {
                    request.query(params);
                }

                if(data) {
                    request.send(data);
                }

                request.end((err, {body} = {}) => err? reject(body || err) :  resolve(body));
            })
        });
    }
}

export default APIClient;