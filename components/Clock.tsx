import { useState, useEffect } from "react";

//digital clock component
export default function Clock(props: {className?: string}) {
    const {className} = props;
    const [date, setDate] = useState(new Date());

    //update clock roughly once every 200ms
    useEffect(() => {
        setInterval(() => {
            setDate(new Date());
        }, 200);
    }, []);

    const formatTime = (d: Date) => {
        const h = d.getHours();
        const m = d.getMinutes();
        const s = d.getSeconds();
        let str = (h === 0 ? "12" : (h > 12 ? h - 12 : h)) + ":";
        str += (m < 10 ? "0" + m : m) + ":";
        str += (s < 10 ? "0" + s : s);
        return str;
    }

    return (
        <div className="flex gap-4">
            <p className={className}>{formatTime(date)}</p>
            <p className={className}>{date.getHours() > 12 ? "PM" : "AM"}</p>
        </div>
    )
}
