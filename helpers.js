
const postData = async (url, body) => {
    try {
        const res = await fetch(url, {
            method: 'post',
            body:    JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        });
        const json = await res.json();
        if(isHTTPError(res.status)) {
            throw new ApolloError(json, "http-status-error", {statusCode: res.status, error: json});
        }
        console.log(json);
        return json;
    } catch (error) {
        console.log(JSON.stringify(error));
        throw error;
    }
};