import React, { useState } from "react"
import Heading from "../../../../components/global/heading/Heading"
import { Button, Carousel, Modal } from "flowbite-react"
import InputClientInfo from "../../../../components/add-client/InputClientInfo"
import { jwtDecode } from 'jwt-decode';

import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import InputProcessInfo from "../../../../components/add-client/InputProcessInfo";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { addClient } from "../../../../app/apis/clientsApi";
import { useSelector } from "react-redux";
import { addProcess } from "../../../../app/apis/processesApi";

const AddClient = () => {
    const auth = useSelector((state) => state.auth.auth);
    const { _id: userId } = jwtDecode(auth.accessToken);
    console.log("_id for user:", userId);

    const date = new Date();
    const formattedDate = `${date.getDate().toString().padStart(2, 0)}/${(date.getMonth() + 1).toString().padStart(2, 0)}/${date.getFullYear()}`;

    const [openModal, setOpenModal] = useState(false);
    const [selectedInfo, setSelectedInfo] = useState({
        clientDone: false,
    });
    const [client, setClient] = useState({
        clientName: "",
        clientEmail: "",
        clientDescription: "",
        clientAddress: "",
        clientPhone: "",
        clientBill: 0,
        isClientDone: false,
        createdDate: formattedDate,
        finishedDate: null,
        clientStatus: "IN_PROGRESS",
        userId: 1, // TODO,
        clientCreatedDate: date
    });
    const [process, setProcess] = useState({
        processTitle: "",
        processDescription: "",
        finishedDate: null,
        processCreatedByUser: userId, // TODO
        processBelongsToClient: -1, // TODO,
        processAssignedToUser: "", // TODO
    });

    const handleAddClient = async (e) => {
        e.preventDefault();
        console.log("before adding client, ", client)
        const { data: clientResponse, error: errorClient } = await addClient(client);
        console.log("client response:",clientResponse.payload);

        const processToCreate = {...process}
        processToCreate.processBelongsToClient = clientResponse.payload._id;



        console.log("processToCreate:", processToCreate);
        const { data: processResponse, error: errorProcess } = await addProcess(processToCreate);
        console.log(processResponse); 

        console.log("Client created!");
        setOpenModal(true);
    }



    return (
        <>
            <div className="w-full overflow-hidden text-slate-600 h-full text-[14px] ">
                {/* Page heading */}
                <div className="mb-7">
                    <Heading pageHeading={"Add Client"} />
                    <p>Create a client from here</p>
                </div>
                {/* Add a client */}
                <div className="h-full overflow-auto border-t pb-20 py-3">
                    <form id="add-client-form" className="h-full w-full">
                        {!selectedInfo.clientDone ?
                            <InputClientInfo client={client} setClient={setClient} setSelectedInfo={setSelectedInfo} />
                            :
                            <InputProcessInfo handleAddClient={handleAddClient} process={process} setProcess={setProcess} setSelectedInfo={setSelectedInfo} />
                        }
                    </form>
                </div>
            </div>

            {/* Floating Modal */}
            <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            New client got created!
                        </h3>
                        <div className="flex justify-center gap-4">
                            <Button color="failure" onClick={() => setOpenModal(false)}>
                                {"Okay"}
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </>

    )
}

export default AddClient