console.log('Hello Ajax');

const getBtn = document.getElementById('getBtn');
const sendBtn = document.getElementById('sendBtn');

// Declare a fucntion for send request

const sendRequest = (method, url, data) => {

    // Declare a promise
    const promise = new Promise((resolve, reject) => {
        // Create a request
        const xhr = new XMLHttpRequest();

        // Call xhr open/prepair method. (It take two parameter 1. request type 2. api/server  location)
        xhr.open(method, url);

        // For get pure json/js object
        xhr.responseType = 'json';

        // We can send type name by header
        xhr.setRequestHeader("Content-Type", "application/json");

        // Send the request by call send method 
        xhr.send(data);

        // Call onload method. (when get the reponse then xhr call onload method)
        xhr.onload = () => {
            // If happend any application level error we can get it by status code .
            if (xhr.status >= 400) {
                reject({
                    message: "Application levle error",
                    res: xhr.response
                })
            } else {
                resolve(xhr.response);
            }
        }

        // Call onerror method. (If network specific issue happend thend it called)
        xhr.onerror = () => {
            reject('Netword related issue. Something went wrong!');
        }

    })

    return promise;
}


const getData = () => {

    sendRequest('GET', 'https://jsonplaceholder.typicode.com/todos/1')
        .then((data) => {
            console.log(data);
        })

}

const sendData = () => {

    sendRequest('POST', 'https://jsonplaceholder.typicode.com/psts', JSON.stringify({
        name: "Anik",
        age: 25,
        userId: 1
    }))
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        })
}

getBtn.addEventListener('click', getData);
sendBtn.addEventListener('click', sendData);