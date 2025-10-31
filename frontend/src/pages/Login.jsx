import { useContext, useState } from "react"
import assets from "../assets/assets"
import { AuthContext } from "../context/authContext";

const Login = () => {
    const[currentState,setCurrentState] =useState("Sign up")
    const[fullName,setFullName]=useState("");
    const [email , setEmail]= useState("");
    const [password ,setPassword]= useState("");
    const [bio , setBio] = useState("");
    const [isDataSubmitted , setIsDataSubmitted] = useState(false);

    const {login}  = useContext(AuthContext)
    const onSubmitHandler = (event)=>{
        event.preventDefault();
        if(currentState === "Sign up" && !isDataSubmitted){
            setIsDataSubmitted(true)
            return;
        }
        login(currentState === "Sign up" ? "signup" : "login",{fullName , email , password , bio})
    }
    
    return(
        <div className="min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly
         max-sm:flex-col backdrop-blur-2xl">
        {/* left */}
        {/* <img src={assets.logo_big} alt="" className="w-[min(30vw,250px)]" /> */}
        <h2 className="text-[50px]  bg-gradient-to-r from-[#217bfe] to-[#8B5CF6] bg-clip-text text-transparent">Chat App</h2>
        {/* right */}
        <form onSubmit={onSubmitHandler} action=""className="border-2 bg-white/8 text-white border-gray-500 p-6 flex
        flex-col gap-6 rounded-lg shadow-lg">
           <h2 className="font-medium text-2xl flex justify-between items-center">
            {currentState}
            {isDataSubmitted && <img onClick={()=> setIsDataSubmitted(false)} src={assets.arrow_icon} alt="" className="w-5 cursor-pointer"/>}
            
            </h2> 
            {currentState === "Sign up" && !isDataSubmitted && ( 
            <input type="text" onChange={(e)=>setFullName(e.target.value)} value={fullName} className="p-2 border border-gray-500 rounded-md focus:outline-none" placeholder="Full Name" required />
             )}
             {!isDataSubmitted && (
                <>
                <input onChange={(e)=> setEmail(e.target.value)} value={email} type="email" placeholder="Email Address" required 
                className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2
                focus:ring-indigo-500"/>

                <input onChange={(e)=> setPassword(e.target.value)} value={password} type="password" placeholder="password" required 
                className="p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2
                focus:ring-indigo-500"/>
                </>
             )}
             {
                 currentState === "Sign up" && isDataSubmitted &&(
                    <textarea onChange={(e)=> setBio(e.target.value)} value={bio} name="" id="" row={4} className="p-2 border border-gray-500 
                    rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="provide a short bio" required>

                    </textarea>
                 )
             }
             <button type="submit" className="py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md curosr-pointer">
                {currentState === "Sign up" ? "Create Account" : "Login Now"}
             </button>
             <div>
                <input type="checkbox" />
                <p>Agree to the terms of use & privacy policy</p>
             </div>
             <div className="flex flex-col gap-2">
                {currentState === "Sign up" ? (
                    <p className="text-sm text-gray-600">Alredy have an account? <span className="font-medium text-violet-500 cursor-pointer"
                    onClick={()=>{setCurrentState("Login") ; setIsDataSubmitted(false)}}> Login here</span></p>
                ) : (
                    <p className="text-sm text-gray-600">Create an account <span className="font-medium text-violet-500 cursor-pointer"
                    onClick={()=>setCurrentState("Sign up")}>Click here</span></p>
                )}
             </div>
        </form> 
        </div>
    )
}

export default Login