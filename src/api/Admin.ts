import request from ".";
async function adminLogin({email,password}:{email:string,password:string}){
    return await request.post('/admin',{email,password})
}


export {adminLogin}