import React, { useState } from "react"

import { Avatar, Button, Modal } from "flowbite-react";

import { HiOutlineExclamationCircle } from "react-icons/hi";
import { IoArrowBackSharp } from "react-icons/io5";
import { MdOutlineAssignmentInd } from "react-icons/md";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

const InputProcessInfo = ({ process, setProcess, setSelectedInfo, handleAddClient }) => {
    const auth = useSelector((state) => state.auth.auth);
    const decodedToken = jwtDecode(auth.accessToken);
    console.log(decodedToken)

    const [openModal, setOpenModal] = useState(false);

    const handleProcessChange = (e) => {
        const { name, value } = e.target;
        setProcess((prev) => ({ ...prev, [name]: value }));
    }

    const handleProcessAssignedClick = () => {
        setProcess((prev) => ({...prev, processAssignedToUser: decodedToken._id}));
    }

    return (
        <>
            <div className="w-full h-full flex flex-col-reverse md:flex-row">
                <div className="md:w-1/2 py-3">
                    <button
                        type="button"
                        className="flex items-center gap-1 mx-1"
                        onClick={() => { setSelectedInfo({ clientDone: false }) }}
                    >
                        <IoArrowBackSharp />
                        Back
                    </button>
                    <div className="space-x-4 flex flex-col items-center">
                        <h2 className="text-2xl font-semibold text-center mb-4">Process Information</h2>
                        <div className="w-2/3">
                            <div className="flex flex-col my-3">
                                <label htmlFor="processTitle">Process Title</label>
                                <input
                                    type="text"
                                    name="processTitle"
                                    id="processTitle"
                                    value={process.processTitle}
                                    onChange={handleProcessChange}
                                    className="px-4 py-2 border rounded-md"
                                    required
                                />
                            </div>
                            <div className="flex flex-col my-3">
                                <label htmlFor="processDescription">Process Description</label>
                                <textarea
                                    rows={2}
                                    name="processDescription"
                                    id="processDescription"
                                    value={process.processDescription}
                                    onChange={handleProcessChange}
                                    className="px-4 py-2 border rounded-md"
                                    required
                                />
                            </div>

                            <div className="flex  my-3">

                                <button
                                    onClick={() => setOpenModal(true)}
                                    type="button"
                                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white"
                                >Assign Process
                                </button>
                            </div>
                            <div className="flex mt-7">
                                <button 
                                    onClick={handleAddClient} 
                                    className="mt-9 bg-orange-500 hover:bg-orange-600 text-white rounded-md font-medium px-4 py-2"
                                >
                                    Create Client
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="md:w-1/2 flex h-40 md:h-full justify-center items-center">
                    <img src="/add-process-img.png" alt="add-process" className="h-full md:h-80" />
                </div>
            </div>

            {/* Floating Modal */}
            <Modal show={openModal} size="xl" onClose={() => setOpenModal(false)} popup>
                <Modal.Header />
                <Modal.Body className=" overflow-y-auto">
                    <div className="text-center h-full">
                        <MdOutlineAssignmentInd className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Assign the process to the user
                        </h3>

                        {/* User Display */}
                        <div className="text-left text-slate-600 my-5 text-[14px] h-[300px] overflow-auto ">
                            <ul className="h-full ">
                                <li onClick={handleProcessAssignedClick} className="flex items-center gap-3 border-b border-t py-2">
                                    <div className="border p-1 rounded-full bg-blue-500 text-white w-[32px] h-[32px] flex justify-center items-center">
                                        <p className="px-2 py-1 ">{decodedToken.username[0]}</p>
                                    </div>
                                    <div>
                                        <p>Harsh Desai</p>
                                        <p>desaiharsh183@gmail.com</p>
                                    </div>
                                </li>
                            </ul>
                        </div>


                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={() => setOpenModal(false)}>
                                {"Yes, I'm sure"}
                            </Button>
                            <Button color="gray" onClick={() => setOpenModal(false)}>
                                No, cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>



        </>
    )
}

export default InputProcessInfo