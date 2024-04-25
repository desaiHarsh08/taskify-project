import React, { useState } from "react"

import { Badge, Button, Modal, Timeline } from "flowbite-react"

import { HiArrowNarrowRight, HiCalendar, HiCheck } from "react-icons/hi"

const TimelineCard = ({ processData, handleTaskFetchByProcess, handleProcessDone, viewProcessId }) => {
    const [openModal, setOpenModal] = useState(false);


    return (
        <>
            <Timeline.Item >
                <Timeline.Point icon={HiCalendar} />
                <Timeline.Content className={`pl-3 w-[300px] pr-3 ${window.innerWidth < 767 ? "border-r" : ""}`}>
                    <Timeline.Time>date</Timeline.Time>
                    <Timeline.Title className="flex justify-start">
                        {processData.processTitle}
                        {processData.isProcessDone && <Badge size="sm" icon={HiCheck} color={"success"} />}
                    </Timeline.Title>
                    <Timeline.Body>
                        {window.innerWidth > 767 && <p>{processData.processDescription}</p>}
                    </Timeline.Body>
                    <div className="space-y-4">
                        <Badge
                            size={"sm"}
                            color={"indigo"}
                            className="text-slate-600 my-2 inline"
                        >@defaultTag
                        </Badge>
                        <div className="flex gap-2">
                            <Button
                                color="gray"
                                onClick={() => {
                                    handleTaskFetchByProcess(processData._id);
                                }}
                            >
                                <div className="flex items-center">
                                    <span>View</span>
                                    <HiArrowNarrowRight className="ml-2 h-3 w-3" />
                                </div>
                            </Button>
                            {console.log(viewProcessId, processData._id, viewProcessId !== processData._id)}
                            <Button
                                disabled={processData.isProcessDone || viewProcessId !== processData._id}
                                color={`${(processData.isProcessDone || viewProcessId === processData._id) ? "light" : "indigo"}`}
                                onClick={() => {
                                    handleProcessDone(processData)
                                }}>
                                <div className="flex items-center">
                                    <span>Done</span>
                                </div>
                            </Button>
                        </div>
                    </div>
                </Timeline.Content>
            </Timeline.Item>


        </>
    )
}

export default TimelineCard