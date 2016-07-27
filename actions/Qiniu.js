
export const URL = 'http://upload.qiniu.com/';
export const upload =  (f, token, url, key) => {
    return new Promise((resolve,reject)=>{
        var xhr = new XMLHttpRequest(),
        formData = new FormData();
        xhr.open('POST', url, true);
        if (key !== null && key !== undefined) {
            formData.append('key', key);
        }
        formData.append('token', token);
        formData.append('file', f);
        xhr.onreadystatechange = function(response) {
          if (xhr.readyState === 4 && (xhr.status >= 200 || xhr.status === 614 )&& xhr.responseText != "") {
              var res = JSON.parse(xhr.responseText);
              resolve(res);
          } else {
              reject(new Error());
          }
        };
        xhr.send(formData);
    })
}
