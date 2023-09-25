function Request(method, url, data, callback) {
    let xhr = new XMLHttpRequest();

    xhr.open(method, url);
    xhr.responseType = 'json';
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onerror = () => {
        console.error('Ошибка при отправке запроса');
        callback(null);
    }

    xhr.onload = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            callback(xhr.response);
        } else {
            console.error(`Error: ${xhr.status}`);
        }
    };


    xhr.send(data);
    console.log(xhr.response)
}