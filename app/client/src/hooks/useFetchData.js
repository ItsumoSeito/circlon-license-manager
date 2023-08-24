import { useEffect, useState } from 'react';

function useFetchData(url) {
    var [data, setData] = useState();
    var [isPending, setIsPending] = useState(true);
    var [error, setError] = useState();

    useEffect(
        function fetchLicenses() {
            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(function handleFetchResponse(response) {
                    return response.json();
                })
                .then(function handleResponseData(responseData) {
                    setData(responseData);
                    setIsPending(false);
                })
                .catch(function handleFetchError(err) {
                    setIsPending(false);
                    setError(err);
                });
        },
        [url]
    );

    return [data, isPending, error];
}

export default useFetchData;
