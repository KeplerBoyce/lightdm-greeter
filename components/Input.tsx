import { useState, useEffect } from "react";

export default function Input(props: {user: string, callback: (text: string) => void}) {
    const {user, callback} = props;
    
    const [show, setShow] = useState(false);
    const [pass, setPass] = useState("");
    const [canType, setCanType] = useState(true);

    const submit = () => {
        (window as any).lightdm.respond(pass);
        setCanType(false);
        setTimeout(() => { //if authentication didn't work after one second, display message
            if (!(window as any).is_authenticated) {
                callback("Password incorrect");
                (window as any).lightdm.cancel_authentication();
                (window as any).lightdm.authenticate(user);
                setCanType(true);
            }
        }, 1000);
    }

    return (
        <div className="flex gap-2">
            <button onClick={() => setShow(!show)} className="stroke-white hover:stroke-green-300 active:stroke-green-400 duration-150">
                {show ? (
                    <svg className="w-8 h-8" fill="none" stroke="inherit" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                ) : (
                    <svg className="w-8 h-8" fill="none" stroke="inherit" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                )}
            </button>
            <input
                type={show ? "text" : "password"}
                value={pass}
                onChange={e => {if (canType) setPass(e.target.value)}}
                className="bg-white/0 text-lg border-2 border-white focus:outline-none rounded-lg px-3 py-1"
            />
            <button onClick={submit} className="stroke-white hover:stroke-green-300 active:stroke-green-400 duration-150">
                <svg className="w-6 h-6" fill="none" stroke="inherit" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </button>
        </div>
    )
}
