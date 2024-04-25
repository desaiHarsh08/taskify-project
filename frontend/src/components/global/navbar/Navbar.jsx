import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { setSidebarView } from "../../../app/features/sidebarViewSlice";

const Navbar = () => {
    const dispatch = useDispatch();

    const sidebarView = useSelector((state) => state.sidebarView.flag);

    const handleHambarClick = () => {
        dispatch(setSidebarView(!sidebarView));
    }
    return (
        <nav className="h-[56px] flex justify-between items-center px-3 border-b">
            <div className="flex items-center gap-7">
                <img src="/taskify-logo.png" alt="" className="w-10 rounded-full h-10" />
                <span className="text-blue-500 font-bold text-xl">Taskify Software</span>
            </div>
            <div>
                <div onClick={handleHambarClick} id="hmbrd" className="md:hidden">
                    <div id="bar-1" className="bg-slate-500 w-7 h-1 rounded-md "></div>
                    <div id="bar-1" className="bg-slate-500 w-7 h-1 rounded-md my-[3px]"></div>
                    <div id="bar-1" className="bg-slate-500 w-7 h-1 rounded-md "></div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar