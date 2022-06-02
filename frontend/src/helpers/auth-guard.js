import router from '../router'

export function authGuard(to){
    const token = localStorage.getItem('token')
    
    if(token){
        return true
    }
    localStorage.clear()
    router.push('/login')
    .then(() => {
        window. location. reload();
        })
    .catch(error => error)

}