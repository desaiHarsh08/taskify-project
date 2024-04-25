import { Badge, Button, Modal, Table } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import EditModal from './EditModal';
import TaskDoneModal from './TaskDoneModal';
import ProcessModalConfirm from './ProcessModalConfirm';
import { updateTask } from '../../../app/apis/taskApis';

const TaskCard = ({ task, index, saveTask }) => {
    const [openEditModal, setOpenEditModal] = useState(false);

    const [openTaskDoneModal, setOpenTaskDoneModal] = useState(false);
    const [confirmTaskDone, setConfirmTaskDone] = useState(false);

    useEffect(() => {
        if(confirmTaskDone === true) {
            task.isTaskDone = true;
            task.taskStatus = "CLOSES";
            task.finishedDate = Date.now;
            saveTask(task);
        }
    }, [setConfirmTaskDone]);

    return (
        <>
            {/* Task card */}
            <div className="mx- w-full border my-3 min-h-[200px] rounded-lg shadow-md p-2">
                {/* Task Metadata */}
                <div className="flex flex-col my-2">
                    <div className="py-2">
                        <Badge className="inline ">task#{index + 1}</Badge>
                    </div>
                    <h3 className="text-xl font-medium space-x-2">
                        <span>{task.taskTitle}</span>
                    </h3>
                    <p className="my-2">{task.taskDescription}</p>
                    {task.taskNote.length > 0 && <p className="text-xs my-5">
                        <Badge color={"warning"} className="py-1">
                            <span>Note: </span>
                            <span>{task.taskNote}</span>
                        </Badge>
                    </p>}
                </div>
                {/* Task Fields */}
                <div className="h-full my-5">
                    <div className="flex gap-2 items-center">
                        <h4 className="">Task Metadata</h4>
                        {task.taskMetadata.length === 0 && !task.isTaskDone ? <button
                            className="px-4 py-2 text-white rounded-md bg-red-500 outline-none hover:bg-red-600"
                            onClick={() => setOpenEditModal(true)}
                        >Add Task Metadata
                        </button> : ''}
                    </div>
                    <div className="overflow-x-auto m-3">
                        {task?.taskMetadata.length > 0 ?
                            <Table className="">
                                <Table.Head className="border">
                                    {Object.keys(task.taskMetadata).map((key, index) => (
                                        <Table.HeadCell
                                            key={`task-metadata-key-${index}`}
                                            className="border"
                                        >
                                            {key}
                                        </Table.HeadCell>
                                    ))}
                                    <Table.HeadCell className="border">
                                        Actions
                                    </Table.HeadCell>
                                </Table.Head>
                                <Table.Body className="divide-y border">
                                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                        {task.taskMetadata.map((metadata, index) => (
                                            <Table.Cell
                                                key={`task-metdatdata-value-${index}`}
                                                className="border whitespace-nowrap font-medium text-gray-900 dark:text-white"
                                            >{metadata.fieldValue}
                                            </Table.Cell>
                                        ))}
                                        <Table.Cell className="border">
                                            <button
                                                className="px-4 py-2 text-white rounded-md bg-red-500 outline-none hover:bg-red-600"
                                                onClick={() => setOpenEditModal(true)}
                                            >Edit
                                            </button>
                                        </Table.Cell>
                                    </Table.Row>
                                </Table.Body>
                            </Table> : ''}
                    </div>
                </div>
                {/* Assigned To */}
                <Badge color={"pink"} className="inline" size={"sm"}>desaiharsh183@gmail.com</Badge>

                {/* Task Done */}
                <Button 
                    disabled={task.isTaskDone}
                    color="blue" 
                    onClick={() => { setOpenTaskDoneModal(true) }} 
                    className="my-3 mt-5"
                >Done</Button>
            </div>


            {/* Floating Edit modal */}
            <EditModal
                task={task}
                saveTask={saveTask}
                openModal={openEditModal}
                setOpenModal={setOpenEditModal}
            />
            {/* Floating Task done modal */}
            <TaskDoneModal
                openModal={openTaskDoneModal}
                setOpenModal={setOpenTaskDoneModal}
                setConfirmTaskDone={setConfirmTaskDone}
            />
            {/* Floating ProcessModal */}
            {/* <ProcessModalConfirm openModal={openProcessModalModal} setOpenModal={setOpenProcessModalModal} setProcessDone={setProcessDone}  /> */}

        </>
    )
}

export default TaskCard