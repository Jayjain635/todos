export default function getUserDetails()
{
    const user = JSON.parse(localStorage.getItem('todoAppUser'));
    return user;
}