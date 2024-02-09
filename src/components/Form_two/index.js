import "./style.css"
import { useState } from 'react';
import { validate } from "../helpers";
import image from "../assets/Frame 337.png"


export function FormTwo(){

    
    const [profileDatas,setProfileDatas] = useState({
        fullname:"",
        email: "",
        password: "",
        terms: false
        })

    const [errors,setErrors] = useState({
        fullname:"",
        email: "",
        password: "",
        terms: false
      })
  
      const handleChange = (e) => {
        e.preventDefault()    
  
        const {name, type, checked, value} = e.target;
  
        setProfileDatas({
          ...profileDatas,
          [name]: type === "checkbox" ? checked : value 
        })
  
        const error = validate(name,value)
        setErrors({
          ...errors,
          [name]: error
        })
  
      }
  
      const handleSubmit = (e) =>{
        e.preventDefault()
  
        let formIsValid = true;
  
        Object.keys(profileDatas).forEach((name) => {
          const value = profileDatas[name];
          const error = validate(name, value);
          setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error,
          }));
      
          if (error) {
            formIsValid = false;
          }
        });
        
        if(
        profileDatas.fullname.length > 0 &&
        profileDatas.email.length > 0 &&
        profileDatas.password.length > 8 &&
        profileDatas.terms === true 
        ) {
          formIsValid = true;
        }
      
        if (formIsValid) {
          console.log("Form is valid:", profileDatas);
        } else {
          console.log("Form is invalid");
        }
      };    


    return(
        <form className="form" onSubmit={handleSubmit}>
            <div className='form_into'>
                <div className='inputs'>  

    <div className='section_fullname'>
        <label htmlFor="fullname">Full Name*</label>  
        <input className="fullname" 
        name = "fullname" type = "text" 
        onChange={handleChange} 
        defaultValue={profileDatas.fullname} /> 
        {errors.fullname && <span style={{color:"red", fontWeight:"500"}}>{errors.fullname}</span>}
    </div>           

    <div className='section_email'>
        <label htmlFor="email">Email*</label>  
        <input className="email" 
        name = "email" type = "text" 
        onChange={handleChange} 
        defaultValue={profileDatas.email} /> 
        {errors.email && <span style={{color:"red", fontWeight:"500"}}>{errors.email}</span>}
    </div>

    <div className='section_password'> 
        <label htmlFor="password">Password*</label> 
        <input className="password" 
        name = "password" type = "password"
        onChange={handleChange} 
        defaultValue={profileDatas.password} /> 
        {errors.password && <span style={{color:"red", fontWeight:"500"}}>{errors.password}</span>}

    </div>


    <div className='section_terms'>
        <input type="checkbox" className="terms" name="terms" value={profileDatas.terms} onChange={handleChange} />
        <label htmlFor="terms">I agree to Terms & Conditions</label>
        {errors.terms && <p style={{color:"red", fontWeight:"500", margin:"0 0 0 5px"}}>{errors.terms}</p>}

    </div>  

       
        </div>

        <button className="btn" type='submit'>Sign In</button>
        <span className="span">Don’t have an account? <span style={{color:"blue"}}>Sign Up</span></span>
        <img src={image} alt=""></img>

        </div>
        </form>


    )
}
