export const getResponseData = (response) => {
    // Return the data if the request was successful, otherwise `null`
    return response.status === 200 ? response.data : null;
}
