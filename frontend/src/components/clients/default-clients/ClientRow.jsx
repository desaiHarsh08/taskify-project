import { Badge } from 'flowbite-react'
import React from 'react'
import { LiaRupeeSignSolid } from 'react-icons/lia'
import { useNavigate } from 'react-router-dom'

const ClientRow = ({client, index}) => {
    const navigate = useNavigate();

    const handleClientClick = (clientId) => {
        navigate(`${clientId}`, { replace: true });
    }
    return (
        <div onClick={()=>{handleClientClick(client._id)}} className="tr py-3 cursor-pointer hover:bg-slate-50 border-b flex text-center">
            <p className="w-[16.66%]">{index + 1}</p>
            <p className="w-[16.66%]">{client.clientName}</p>
            <p className="w-[16.66%]">{client.createdAt}</p>
            <p className="w-[16.66%] flex justify-center">
                <Badge color={"failure"}>{client.clientStatus}</Badge>
            </p>
            <p className="w-[16.66%] flex justify-center">
                <Badge color={"pink"}>PENDING</Badge>
            </p>
            <p className="w-[16.66%] flex items-center justify-center gap-1">
                <LiaRupeeSignSolid />
                <span>{client.clientBill}</span>
            </p>
        </div>
    )
}

export default ClientRow