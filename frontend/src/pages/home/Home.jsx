import React, { useEffect } from "react"

import { useDispatch, useSelector } from "react-redux";

import "../../styles/Home.css"

import { Outlet, useNavigate } from "react-router-dom"

import Navbar from "../../components/global/navbar/Navbar"
import Sidebar from "../../components/global/sidebar/Sidebar"
import { setSidebarView } from "../../app/features/sidebarViewSlice";

const Home = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const sidebarView = useSelector((state) => state.sidebarView.flag);

    const auth = useSelector((state) => state.auth.auth);
    console.log(auth.roles)
    useEffect(() => {
        if (!auth) {
            navigate("/", { replace: true });
        }

        if(window.innerWidth < 767) {
            dispatch(setSidebarView(false));
        }
    }, []);

    return (
        <div className="h-screen border overflow-hidden">
            <Navbar />
            <main id="home-main" className="w-full flex">
                <aside className={`z-[100000] md:z-auto w-[225px] h-full bg-slate-50 absolute md:relative ${!sidebarView ? "-translate-x-[1000px]" : ""} md:translate-x-0`}>
                    <Sidebar />
                </aside>
                <section id="shared-area" className="px-0 py-3 md:p-3 border overflow-auto">
                    <Outlet />
                </section>
            </main>
        </div>
    )
}

export default Home