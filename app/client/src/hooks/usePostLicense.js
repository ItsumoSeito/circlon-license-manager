import { useState } from 'react';

function usePostLicense() {
    var [response, setResponse] = useState();
    var [error, setError] = useState();

    function postLicense(url, payload) {
        fetch(url, {
            method: 'POST',
            body: payload,
        })
            .then(function handleResponse(res) {
                setResponse(res);
            })
            .catch(function handleError(err) {
                setError(err);
            });
    }

    return [postLicense, error, response];
}

export default usePostLicense;
