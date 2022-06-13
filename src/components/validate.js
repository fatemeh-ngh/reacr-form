const validate = (data, type) => {
    const errors = {};

    if(!data.email){
        errors.email = "emails required"
    }else if(! /\S+@\S+\.\S+/.test(data.email)){
        errors.email = "emails address is invalid"
    }else{
        delete errors.email
    }
    if(!data.password){
        errors.password = "password is required"
    }else if (data.password.length < 6){
        errors.password = "password needs to be 6 character"
    }else{
        delete errors.password
    }

    if(type === "SignUp"){
        if(!data.name.trim()){
            errors.name= "user name required"
        }else{
            delete errors.name
        }
        if(!data.confirmPassword){
            errors.confirmPassword = "Confirm the Password"
        }else if (data.confirmPassword !== data.password){
            errors.confirmPassword = "password dont match"
        }else{
            delete errors.confirmPassword
        }
        if(data.isAccepted){
            delete errors.isAccepted
        }else{
            errors.isAccepted = "Accept our regulations"
        }
    }
    return errors
}
export {validate}