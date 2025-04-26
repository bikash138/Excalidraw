"use client";

export function AuthPage({isSignin}:{isSignin:boolean}){
    return(
        <div className="w-screen h-screen flex justify-center items-center ">
            <div className="bg-white flex flex-col p-5 rounded-md gap-y-2">
                {isSignin ? "" : <input className="text-black border rounded-md p-2" placeholder="Enter Your Name"/>}   
                <input className="text-black border border-black rounded-md p-2" placeholder="Enter email"/>
                <input className="text-black border rounded-md p-2" placeholder="Enter password"/>
                <button onClick={()=>{}}
                className="p-2 text-black bg-yellow-400 rounded-lg cursor-pointer mt-2 hover:bg-amber-300"
                >
                {isSignin ? "Signin" : "Signup"}
            </button>
            </div>
            
        </div>
    )
}