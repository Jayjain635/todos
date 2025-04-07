const validator = require('email-validator');
exports.register = async (data)=>{
    //name
    if(!data.name) return ({message:"Name required",success:false});

    //email    
    if(!data.email) return ({message:"email required",success:false});
    if (!validator.validate(data.email)) {return { message: "Invalid email format", success: false };}

    //phone
    if(!data.phone) return ({message:"phone required",success:false});
    if (!/[0-9]/.test(data.phone)) {
        return { message: "Password must contain at least one number", success: false };
    }
    if (data.phone.length < 10) {
        return { message: "Enter valid Phone number", success: false };
    }

    //password    
    if(!data.password) return ({message:"password required",success:false});
    if (data.password.length < 8) {
        return { message: "Password must be at least 8 characters long", success: false };
    }
    if (!/[A-Z]/.test(data.password)) {
        return { message: "Password must contain at least one uppercase letter", success: false };
    }
    if (!/[0-9]/.test(data.password)) {
        return { message: "Password must contain at least one number", success: false };
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(data.password)) {
        return { message: "Password must contain at least one special character", success: false };
    }

    return {success:true}

}

exports.login = async (data) => {
    //email      
    if(!data.email) return ({message:"email required",success:false});

    //password     
    if(!data.password) return ({message:"password required",success:false});
    if (data.password.length < 8) {
        return { message: "Password must be at least 8 characters long", success: false };
    }
    
    return { success: true};
  };