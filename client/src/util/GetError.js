export default function getErrorMessage (error){
    const msg = (error.response && error.response.data && error.response.data.message ) || error.toString() || error.message;
    return msg;
}