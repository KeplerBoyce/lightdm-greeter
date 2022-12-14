import dynamic from "next/dynamic";
const Clock = dynamic(() => import("../components/Clock"), { ssr: false });
import { useEffect, useState } from "react";
import Dropdown from "../components/Dropdown";
import Input from "../components/Input";
import { Session, User } from "../util/types";
import mock from "../util/mock";

export default function Home() {
    const [users, setUsers] = useState([{} as User]);
    const [user, setUser] = useState({} as User);
    const [sessions, setSessions] = useState([""]);
    const [session, setSession] = useState("");
    const [wrong, setWrong] = useState(false); //boolean for screen shake
    const [screenBlack, setScreenBlack] = useState(true); //for fading screen in/out

    useEffect(() => {
        mock(); //mock for lightdm js api

        setUsers((window as any).lightdm.users);
        setUser((window as any).lightdm.users[0]);
        setSessions((window as any).lightdm.sessions.map((s: Session) => s.name));
        setSession((window as any).lightdm.users[0].session);

        //stubs to satisfy api
        (window as any).show_prompt = (text: string, type: string) => {};
        (window as any).show_message = (text: string, type: string) => {};
        (window as any).autologin_timer_expired = () => {};

        //if authentication was successful, start session
        (window as any).authentication_complete = () => {
            setScreenBlack(true);
            setTimeout(() => {
                setScreenBlack(false);
                (window as any).lightdm.start_session_sync(session);
            }, 300);
        };

        //default to authentication for first user
        (window as any).lightdm.authenticate((window as any).lightdm.users[0].name);

        setScreenBlack(false); //fade screen in
    }, []);

    const changeUser = (name: string) => {
        users.forEach(u => {
            if (u.display_name === name) {
                setUser(u);
                setSession(u.session);
                (window as any).lightdm.cancel_authentication();
                (window as any).lightdm.authenticate(u.name); //start authentication again for new user
            }
        });
    }

    const restartAuth = () => {
        (window as any).lightdm.cancel_authentication();
        (window as any).lightdm.authenticate(user.name);
    }

    return (
        <>
            <div className="w-screen h-screen flex justify-center items-center
                bg-gradient-to-tr from-fuchsia-600 to-orange-500">
                <div className={"text-white flex flex-col gap-4 items-center"
                        + (wrong ? " animate-shake" : "")}>
                    <Clock className="font-mono text-5xl" />
                    <Input callback={restartAuth} setWrong={setWrong} />
                    <div className="flex gap-2 items-center">
                        <Dropdown options={users.map(u => u.display_name)} callback={changeUser} />
                        <Dropdown options={sessions} selected={session} callback={setSession} />
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => (window as any).lightdm.suspend()}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:stroke-green-300 active:stroke-green-400 duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        </button>
                        <button onClick={() => (window as any).lightdm.shutdown()}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:stroke-green-300 active:stroke-green-400 duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                            </svg>
                        </button>
                        <button onClick={() => (window as any).lightdm.restart()}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:stroke-green-300 active:stroke-green-400 duration-150" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className={"fixed inset-0 z-10 duration-300 "
                + (screenBlack ? "bg-black visible" : "bg-black/0 invisible")} />
        </>
    )
}
