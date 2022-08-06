import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";

export default function Dropdown(props: {options: string[], selected?: string, callback: (value: string) => void}) {
    const {options, callback} = props;
    const [selected, setSelected] = useState(props.selected ?? options[0]);

    useEffect(() => {
        if (props.selected) {
            setSelected(props.selected);
        }
    }, [props.selected]);

    return (
        <div className="grow flex flex-col gap-1 min-w-[8rem]">
            <div className="relative">
                <Listbox value={selected} onChange={setSelected}>
                    <Listbox.Button className="flex items-center w-full border-2 border-white text-left px-2 py-1 pr-1 rounded-md">
                        <p className={"grow" + (selected === options[0] ? " text-white" : "")}>
                            {selected}
                        </p>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                        </svg>
                    </Listbox.Button>
                    <Transition
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 -translate-y-2"
                        enterTo="opacity-100"
                        leave="ease-in duration-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0 -translate-y-2"
                    >
                        <Listbox.Options className="backdrop-blur border-2 border-white scrollbar absolute mt-1 flex flex-col divide-y divide-white max-h-60 w-full overflow-y-auto rounded-md">
                            {options.map((o, i) =>
                                <Listbox.Option key={i} value={o}>
                                    <button
                                        onClick={() => {
                                            setSelected(o);
                                            callback(o);
                                        }}
                                        className={"w-full px-2 py-1 text-left hover:bg-white/20 duration-150 "
                                            + (selected === o ? "text-green-300" : "text-white")}
                                    >
                                        {o}
                                    </button>
                                </Listbox.Option>
                            )}
                        </Listbox.Options>
                    </Transition>
                </Listbox>
            </div>
        </div>
    )
}
