import React, { useEffect, useState } from "react"

import { Card } from "flowbite-react";
import { IoMdStats } from "react-icons/io";
import { TbCalendarStats } from "react-icons/tb";

import { PieChart } from '@mui/x-charts/PieChart';
import LineChartStats from "../../../components/default-home/LineChartStats";

import { LiaRupeeSignSolid } from "react-icons/lia";

import { Button, Timeline } from "flowbite-react";
import { HiArrowNarrowRight } from "react-icons/hi";
import { FaPeopleGroup } from "react-icons/fa6";
import { GiProgression } from "react-icons/gi";
import { fetchAllUsers } from "../../../app/apis/authApis";
import { fetchAllClients } from "../../../app/apis/clientsApi";
import { fetchTodaysLogs } from "../../../app/apis/logsApi";

const DefaultHome = () => {
    const date = new Date();
    const currentTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

    const [allUsers, setUsers] = useState([]);
    const [allClients, setAllClients] = useState([]);
    const [todaysLog, setTodaysLog] = useState([]);

    useEffect(() => {
        (async() => {
            // const { data } = await fetchAllUsers();
            // if(!data) {
            //     alert("Unable to fetch users!");
            // }
            // console.log(data.payload);
            // setUsers(data.payload);


            const { data } = await fetchAllClients();
            if(!data) {
                alert("Unable to fetch users!");
            }
            console.log(data.payload);
            setAllClients(data.payload);

            // const { data: allLogs } = await fetchTodaysLogs();
            // if(!allLogs) {
            //     alert("Unable to fetch logs!");
            // }
            // console.log(allLogs.payload);
            // setTodaysLog(allLogs.payload);
        })();
    }, []);

    return (
        <div className="px-2 flex flex-col-reverse overflow-scroll md:flex-row w-full h-full md:overflow-hidden overflow-x-hidden">
            <div className="border-red-500">
                {/* Stats */}
                <div className="flex flex-col md:flex-row gap-2">
                    <div className="border flex flex-col justify-start card p-3">
                        <h1 className="font-bold">Comparison</h1>
                        <div className="w-full overflow-auto">

                        <LineChartStats />
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-2">
                            <Card className="bg-blue-500">
                                <h5 className="text-white flex justify-between items-center text-2xl font-bold tracking-tight dark:text-white gap-2">
                                    <span>Supervisor</span>
                                    <IoMdStats className="text-3xl " />
                                </h5>
                                <p className="font-normal text-xl text-white dark:text-gray-400">
                                    0
                                </p>
                            </Card>
                            <Card className="bg-red-500">
                                <h5 className="flex text-white justify-between items-center text-2xl font-bold tracking-tight dark:text-white gap-2">
                                    <span>Operator</span>
                                    <IoMdStats className="text-3xl " />
                                </h5>
                                <p className="font-normal text-xl text-white dark:text-gray-400">
                                    0
                                </p>
                            </Card>
                            <Card className="bg-purple-500">
                                <h5 className="flex justify-between items-center text-2xl font-bold tracking-tight text-white dark:text-white gap-2">
                                    <span>User</span>
                                    <IoMdStats className="text-3xl " />
                                </h5>
                                <p className="font-normal text-xl text-white dark:text-gray-400">
                                    0
                                </p>
                            </Card>
                        </div>


                    </div>
                    <Card
                        className="max-w-s m"
                        imgAlt="Meaningful alt text for an image that is not purely decorative"
                        imgSrc="/transaction-img.webp"
                    >
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            Payment Received
                        </h5>
                        <p className="font-bold flex items-center text-gray-700 dark:text-gray-400">
                            <LiaRupeeSignSolid className="font-bold text-xl" />
                            <span>0</span>
                        </p>
                    </Card>

                </div>
                {/* Activity */}
                <div id="default-home-activity" className="my-2 overflow-auto">
                    <h2 className="text-xl font-semibold text-slate-600 pb-3 border-b">Today's Activity</h2>
                    <div className="my-5">
                        <Timeline className="ml-2 ">
                            <Timeline.Item>
                                <Timeline.Point />
                                <Timeline.Content>
                                    <Timeline.Time>February 2022, {currentTime}</Timeline.Time>
                                    <Timeline.Title>Application UI code in Tailwind CSS</Timeline.Title>
                                    <Timeline.Body>
                                        Get access to over 20+ pages including a dashboard layout, charts, kanban board, calendar, and pre-order
                                        E-commerce & Marketing pages.
                                    </Timeline.Body>
                                </Timeline.Content>
                            </Timeline.Item>
                            <Timeline.Item>
                                <Timeline.Point />
                                <Timeline.Content>
                                    <Timeline.Time>March 2022</Timeline.Time>
                                    <Timeline.Title>Marketing UI design in Figma</Timeline.Title>
                                    <Timeline.Body>
                                        All of the pages and components are first designed in Figma and we keep a parity between the two versions
                                        even as we update the project.
                                    </Timeline.Body>
                                </Timeline.Content>
                            </Timeline.Item>
                            <Timeline.Item>
                                <Timeline.Point />
                                <Timeline.Content>
                                    <Timeline.Time>April 2022</Timeline.Time>
                                    <Timeline.Title>E-Commerce UI code in Tailwind CSS</Timeline.Title>
                                    <Timeline.Body>
                                        Get started with dozens of web components and interactive elements built on top of Tailwind CSS.
                                    </Timeline.Body>
                                </Timeline.Content>
                            </Timeline.Item>
                        </Timeline>
                    </div>
                </div>
            </div>
            <div className="my-3 flex justify-center md:justify-start items-start">
                <div className="flex justify-center md:flex-col flex-wrap gap-2 md:px-3">
                    <Card className="w-full md:w-[18rem]">
                        <h5 className="flex gap-2 justify-between items-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            <span>Total Clients</span>
                            <FaPeopleGroup className="text-3xl " />
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            {allClients.length}
                        </p>
                    </Card>
                    <Card className="w-full md:w-[18rem]">
                        <h5 className="flex gap-2 justify-between items-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            <span>Clients this month</span>
                            <TbCalendarStats className="text-3xl " />
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            {allClients.length}
                        </p>
                    </Card>
                    <Card className="w-full md:w-[18rem]">
                        <h5 className="flex gap-2 justify-between items-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            <span>Payment Received</span>
                            <TbCalendarStats className="text-3xl " />
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            0
                        </p>
                    </Card>
                    <Card className="w-full md:w-[18rem]">
                        <h5 className="flex gap-2 justify-between items-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            <span>Ongoing</span>
                            <GiProgression className="text-3xl " />
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            {allClients.length}
                        </p>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default DefaultHome

