

export function login(){
    return new Promise((resolve) =>{
        resolve({
            login:'coming to here'
        })
    })
}

export function loadAuth() {
    return new Promise((resolve, reject) => {
        reject({
            auth:true
        })
    });
}