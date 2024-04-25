import { Button, Label, Modal, TextInput } from "flowbite-react"
import React, { useEffect, useState } from "react"

import { HiOutlineExclamationCircle } from "react-icons/hi"
import { IoMdClose } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { updateTask } from "../../../app/apis/taskApis";

const EditModal = ({ openModal, setOpenModal, task, saveTask }) => {
    const [modalPlacement, setModalPlacement] = useState('center')

    const [metadataArr, setMetadatArr] = useState(task.taskMetadata);

    const [metadataElements, setMetadataElements] = useState([]);

    const addMetadataElement = () => {
        const newMetadataArr = [...metadataArr];
        newMetadataArr.push({ fieldName: "", fieldValue: "" });
        setMetadatArr(newMetadataArr);
    }

    const deleteMetadataElement = (index) => {
        let newMetadataArr = [...metadataArr];
        newMetadataArr = newMetadataArr.filter((ele, i) => i !== index);
        setMetadatArr(newMetadataArr);
    }

    

    useState(() => {
        if (task.taskMetadata.length === 0) {
            addMetadataElement();
        }
    }, []);

    const handleMetadataChange = (e, index) => {
        const { name, value } = e.target;
        let newMetadataArr = [...metadataArr];
        newMetadataArr = newMetadataArr.map((metadata, i) => {
            if (index === i) {
                metadata = { ...metadata, [name]: value }
            }
            return metadata;
        });
        setMetadatArr(newMetadataArr);
    }

    return (
        <Modal position={modalPlacement} show={openModal} size="xl" onClose={() => setOpenModal(false)} popup>
            <Modal.Header />
            <Modal.Body className=" overflow-y-auto">
                <div className="text-center h-full">
                    <div>
                        <FaEdit className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Do edit the task metadata
                        </h3>
                    </div>
                    {/* Task Metadata */}
                    <div className="task-metdata-container my-3 space-y-5">
                        {metadataArr.length > 0 && metadataArr.map((metadata, index) => (
                            <div className="flex justify-center items-center gap-2">
                                <TextInput
                                    key={`metadata-element-${index}`}
                                    type="text"
                                    className="w-[40%]"
                                    placeholder={`field${index + 1}`}
                                    name="fieldName"
                                    value={metadata.fieldName}
                                    onChange={(e) => { handleMetadataChange(e, index) }}
                                    required
                                />
                                <TextInput
                                    type="text"
                                    className="w-[40%]"
                                    placeholder={`fieldValue${index + 1}`}
                                    name="fieldValue"
                                    value={metadata.fieldValue}
                                    onChange={(e) => { handleMetadataChange(e, index) }}
                                    required
                                />
                                <IoMdClose onClick={()=>{deleteMetadataElement(index)}} className="text-3xl text-slate-600" />
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center gap-4">
                        <Button color="failure" onClick={() => saveTask(task, metadataArr)}>
                            Save
                        </Button>
                        <Button color="gray" onClick={addMetadataElement}>
                            Add
                        </Button>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default EditModal