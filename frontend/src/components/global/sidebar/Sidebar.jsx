import React from "react"

import { Link } from "react-router-dom";

import { FaPeopleGroup } from "react-icons/fa6";
import { GoWorkflow } from "react-icons/go";
import { MdOutlinePermContactCalendar } from "react-icons/md";
import { IoIosPersonAdd } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { RiHomeOfficeLine } from "react-icons/ri";
import { RiLogoutBoxLine } from "react-icons/ri";

const Sidebar = () => {
    const sideNavArr = [
        { path: "/home", label: "My Space", icon: <GoWorkflow /> },
        { path: "/home", label: "Contacts", icon: <MdOutlinePermContactCalendar /> },
        { path: "/home", label: "Home", icon: <RiHomeOfficeLine /> },
        { path: "clients", label: "Clients", icon: <FaPeopleGroup /> },
        { path: "add-client", label: "Add Clients", icon: <IoIosPersonAdd /> },
        { path: "/home", label: "Settings", icon: <IoSettingsOutline /> },
        { path: "/", label: "Logout", icon: <RiLogoutBoxLine /> },
    ];

    return (
        <div className=" bg-slate-50 w-full h-full flex justify-center text-[15px]">
            <ul className="text-slate-500 w-3/4 mt-7 h-full">
                {sideNavArr.map((sideNav, index) => (
                    <>
                        <li 
                            key={sideNav.path} 
                            className={`my-2 pl-4 `}
                        >
                            <Link 
                                to={sideNav.path}
                                className="flex gap-3 items-center"
                            >
                                {sideNav.icon}
                                <span>{sideNav.label}</span>
                            </Link>
                        </li>
                        {index===1 || index===4 ? <hr /> : ''}
                    </>
                ))}
            </ul>
        </div>
    )
}

export default Sidebar