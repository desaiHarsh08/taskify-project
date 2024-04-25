import React, { useEffect, useState } from "react"

import { useParams } from "react-router-dom"

import { HiArrowNarrowRight, HiCalendar, HiOutlineExclamationCircle } from "react-icons/hi";
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdAddCard } from "react-icons/md";
import { MdLibraryAdd } from "react-icons/md";

import { Avatar, Label, Modal, Radio, Table } from "flowbite-react";
import { Badge, Button, Timeline } from "flowbite-react";

import Heading from "../../../../../components/global/heading/Heading";
import TimelineCard from "../../../../../components/clients/client-view/TimelineCard";
import TaskCard from "../../../../../components/clients/client-view/TaskCard";
import { addProcess, fetchAllProcessByClientId, updateProcess } from "../../../../../app/apis/processesApi";
import { addTask, fetchTasksByProcessId, updateTask } from "../../../../../app/apis/taskApis";
import { fetchClientById, updateClient } from "../../../../../app/apis/clientsApi";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";

const ClientView = () => {
    const auth = useSelector((state) => state.auth.auth);
    const decodedToken = jwtDecode(auth.accessToken);
    const { _id: userId } = decodedToken;

    const { clientId } = useParams();

    const [opentaskModal, setOpentaskModal] = useState(false);
    const [openAddProcessModal, setOpenAddProcessModal] = useState(false);

    const [viewProcessFlag, setViewProcessFlag] = useState(false);
    const [viewProcessId, setViewProcessId] = useState("");
    const [client, setClient] = useState();

    const [task, setTask] = useState({
        taskTitle: "",
        taskDescription: "",
        taskNote: "",
        taskCreatedByUser: userId,
        taskAssignedToUser: userId,
        taskBelongsToClient: clientId,
        taskForProcess: viewProcessId,
        taskMetadata: []
    });

    const [process, setProcess] = useState({
        processTitle: "",
        processDescription: "",
        taskNote: "",
        processCreatedByUser: userId,
        processAssignedToUser: userId,
        processBelongsToClient: clientId,
    });

    const [processesArr, setProcessArr] = useState([]);
    const [tasksArr, setTasksArr] = useState([]);


    useEffect(() => {
        fetchClientById(clientId)
            .then((data) => {
                console.log(data.data.payload);
                setClient(data.data.payload)
            })
            .catch((err) => alert("Unable to fetch client details!"));
        fetchAllProcessByClientId(clientId).then((jsonData) => {
            const arr = jsonData.data.payload
            console.log("last processId:", arr[arr.length - 1]._id);
            setViewProcessId(arr[arr.length - 1]._id);
            console.log(jsonData);
            setProcessArr(jsonData.data.payload);
        })
        console.log("viewProcessId:", viewProcessId)
    }, []);

    const handleTaskChange = (e) => {
        const { name, value } = e.target;
        setTask((prev) => ({ ...prev, [name]: value }));
    }

    const handleProcessChange = (e) => {
        const { name, value } = e.target;
        setProcess((prev) => ({ ...prev, [name]: value }));
    }

    const handleAddTask = async () => {
        const { taskTitle, taskDescription } = task;
        if ([taskDescription, taskTitle].some(field => field.trim() === "")) {
            alert("Please enter valid fields!");
            return;
        }
        const newTask = { ...task };
        newTask.taskForProcess = viewProcessId;
        const { data, error } = await addTask(newTask);
        console.log(data.payload);
        if (error !== null) {
            alert("Unable to add task")
            setOpentaskModal(false);
            return;
        }
        handleTaskFetchByProcess(viewProcessId);
        setOpentaskModal(false);
    }

    const handleAddProcess = async () => {
        const { processTitle, processDescription } = process;
        if ([processTitle, processTitle].some(field => field.trim() === "")) {
            alert("Please enter valid fields!");
            return;
        }
        const { data, error } = await addProcess(process);
        console.log(data.payload);
        if (error !== null) {
            alert("Unable to add process!")
            setOpentaskModal(false);
            return;
        }
        const { data: fetchProcessData, error: errorProcess } = await fetchAllProcessByClientId(clientId);
        setProcessArr(fetchProcessData.payload);

        setOpenAddProcessModal(false);
    }

    const handleProcessDone = async (process) => {
        const processMarked = { ...process }
        processMarked.isProcessDone = true;
        processMarked.processStatus = "CLOSED";
        processMarked.finishedDate = Date.now;

        console.log("process done marked:", processMarked);
        const { data } = await updateProcess(processMarked);
        console.log(data)
        if (!data) {
            alert("Unable to mark the process as done!");
            return;
        }
        const { data: allProcesses } = await fetchAllProcessByClientId(clientId);
        console.log(allProcesses);
        if (!data) {
            alert("Unable to fetch processes!");
            return;
        }
        setProcessArr(allProcesses.payload);
    }

    const handleTaskFetchByProcess = async (processId) => {
        console.log("Fetch task for processId:", processId);
        const { data, error } = await fetchTasksByProcessId(processId);
        if (error !== null) {
            alert("Unable to fetch the tasks!");
            return;
        }
        console.log(data.payload);
        setTasksArr(data.payload);
        setViewProcessId(processId);
    }

    const saveTask = async (task, metadataArr = []) => {
        task.taskMetadata = metadataArr;
        const { data } = await updateTask(task);
        console.log(data);
        if (data === null) {
            alert("Unable to save the task!");
            return;
        }
        const { data: allTasks } = await fetchTasksByProcessId(viewProcessId);
        if (!allTasks) {
            alert("Unable to fetch the task for the selected process!");
            return;
        }
        setTasksArr(allTasks.payload);
    }

    const saveClient = async () => {
        const newClient = {...client};
        newClient.isClientDone = true;
        newClient.clientStatus = "CLOSED";
        newClient.finishedDate = Date.now;
        setClient(newClient);
        const { data } = await updateClient(newClient);
        console.log(data);
        if(data === null) {
            alert("Unable to mark the client as done!");
        }
    }

    return (
        <>
            <div className="w-full h-full overflow-y-scroll md:overflow-hidden md:mx-3">
                <div className="flex gap-3 h-[57px] items-center w-full mb-4">
                    <Heading pageHeading={client?.clientName} />
                    {/* <p className="text-xl text-red-500">#{clientId}</p> */}
                    {/* <button
                        disabled={client?.isClientDone}
                        className={`flex items-center gap-2 px-4 py-2 ${!client?.isClientDone ? "bg-blue-500 hover:bg-blue-600" : "bg-green-500 hover:bg-green-600"} text-white rounded-md`}
                        onClick={saveClient}
                    >
                        <span>Done</span>
                    </button> */}
                </div>
                <div>

                    <button
                        className="flex items-center gap-2 px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-md"
                        onClick={() => setOpenAddProcessModal(true)}
                    >
                        <MdAddCard />
                        <span>Add Process</span>
                    </button>

                </div>
                <div id="client-timeline" className="py-3 w-full flex flex-col md:flex-row borde r-t">
                    {/* Process Display Container */}
                    {
                        <div className="md:w-1/4 md:h-full overflow-auto py-3">
                            <Timeline horizontal={window.innerWidth < 767} className={`m-3 ${window.innerWidth < 767 ? "flex" : " "}`}>
                                {processesArr.length > 0 && processesArr.map((process) => (
                                    <TimelineCard
                                        processData={process}
                                        handleTaskFetchByProcess={handleTaskFetchByProcess}
                                        handleProcessDone={handleProcessDone}
                                        viewProcessId={viewProcessId}
                                    />
                                ))}
                            </Timeline>
                        </div>
                    }
                    {/* Task Display Container */}
                    <div className="h-[50vh] md:h-auto md:w-3/4 px-2 py-3 text-slate-600">
                        <div>
                            <div className="flex items-center gap-2 border-b pb-3">
                                <h2 className="text-2xl font-semibold">
                                    {(processesArr?.find(ele => ele._id == viewProcessId))?.processTitle}
                                </h2>
                                <Badge size={"sm"} color={"indigo"} className="text-slate-600 my-2 inline">@defaultTag</Badge>
                            </div>
                            <button onClick={() => setOpentaskModal(true)} className="flex items-center gap-1 my-7 px-4 py-2 bg-orange-500 text-white rounded-md">
                                <MdLibraryAdd />
                                <span>Add Task</span>
                            </button>
                        </div>
                        {/* All Task */}
                        <div id="task-container" className="task-container border-t px-3 h-full py-7 pb-9 overflow-y-auto">
                            {tasksArr.length === 0 && <p>No task created!</p>}
                            {tasksArr && tasksArr?.map((task, index) => (
                                <TaskCard
                                    key={`task-${index}`}
                                    task={task}
                                    index={index}
                                    saveTask={saveTask}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>


            <Modal show={opentaskModal} size="3xl" onClose={() => setOpentaskModal(false)} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <IoIosAddCircleOutline className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Add the task
                        </h3>

                        <div className="text-slate-600 my-7 space-y-4">
                            <div className="flex gap-1 flex-col items-start">
                                <label htmlFor="taskTitle">Task Title</label>
                                <input
                                    type="text"
                                    name="taskTitle"
                                    id="taskTitle"
                                    value={task.taskTitle}
                                    onChange={handleTaskChange}
                                    className="px-4 w-full py-2 border rounded-md border-slate-300"
                                />
                            </div>
                            <div className="flex gap-1 flex-col items-start">
                                <label htmlFor="taskDescription">Task Description</label>
                                <input
                                    type="text"
                                    name="taskDescription"
                                    id="taskDescription"
                                    value={task.taskDescription}
                                    onChange={handleTaskChange}
                                    className="px-4 w-full py-2 border rounded-md border-slate-300"
                                />
                            </div>
                            <div className="flex gap-1 flex-col items-start">
                                <label htmlFor="taskNote">Task Note</label>
                                <input
                                    type="text"
                                    name="taskNote"
                                    id="taskNote"
                                    value={task.taskNote}
                                    onChange={handleTaskChange}
                                    className="px-4 w-full py-2 border rounded-md border-slate-300"
                                />
                            </div>
                            <div className="flex gap-1 flex-col items-start">
                                <p>Assigned task</p>
                                <ul className="h-full w-full text-left">
                                    <li className="flex items-center gap-3 py-2 border-b border-t">
                                        <div>
                                            <Radio id="germany" name="countries" value="Germany" />
                                            <Label htmlFor="germany"></Label>
                                        </div>
                                        <div className="border p-1 rounded-full">
                                            <Avatar img="/images/people/profile-picture-5.jpg" alt="avatar of Jese" rounded />
                                        </div>
                                        <div>
                                            <p>Harsh Desai</p>
                                            <p>desaiharsh183@gmail.com</p>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                        </div>

                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={handleAddTask}>
                                {"Add Task"}
                            </Button>
                            <Button color="gray" onClick={() => setOpentaskModal(false)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>


            <Modal show={openAddProcessModal} size="3xl" onClose={() => setOpenAddProcessModal(false)} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <IoIosAddCircleOutline className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Add the Process
                        </h3>

                        <form className="text-slate-600 my-7 space-y-4">
                            <div className="flex gap-1 flex-col items-start">
                                <label htmlFor="processTitle">Process Title</label>
                                <input
                                    type="text"
                                    name="processTitle"
                                    id="processTitle"
                                    value={process.processTitle}
                                    onChange={handleProcessChange}
                                    className="px-4 w-full py-2 border rounded-md border-slate-300"
                                />
                            </div>
                            <div className="flex gap-1 flex-col items-start">
                                <label htmlFor="processDescription">Process Description</label>
                                <input
                                    type="text"
                                    name="processDescription"
                                    id="processDescription"
                                    value={process.processDescription}
                                    onChange={handleProcessChange}
                                    className="px-4 w-full py-2 border rounded-md border-slate-300"
                                />
                            </div>
                            <div className="flex gap-1 flex-col items-start">
                                <div className="flex gap-1 flex-col items-start w-full">
                                    <p>Assigned Process</p>
                                    <ul className="h-full w-full text-left">
                                        <li className="cursor-pointer flex items-center gap-3 py-2 border-b border-t">
                                            <div className="border p-1 rounded-full flex justify-center items-center bg-blue-500 text-white px-[10px]">
                                                <p>{decodedToken?.username[0]}</p>
                                            </div>
                                            <div>
                                                <p>{decodedToken?.username}</p>
                                                <p>{decodedToken?.email}</p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </form>

                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={handleAddProcess}>
                                {"Add Process"}
                            </Button>
                            <Button color="gray" onClick={() => setOpenAddProcessModal(false)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

        </>
    )
}

export default ClientView