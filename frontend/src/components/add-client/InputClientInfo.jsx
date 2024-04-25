import React, { useState } from "react"

const InputClientInfo = ({ client, setClient, setSelectedInfo }) => {
    const handleClientChange = (e) => {
        const { name, value } = e.target;
        setClient((prev) => ({ ...prev, [name]: value }));
    }

    const handleNext = () => {
        console.log('fired', client)
        if([
            client.className, 
            client.clientDescription, 
            client.clientAddress, 
            client.clientEmail, 
            client.clientPhone,
        ]?.some((field) => field?.trim()==='')) {
            alert("Please input all the fields!");
            
            return;
        }
        setSelectedInfo({clientDone: true})
    }

  return (
    <div className="w-full h-full pb-4 md:pb-0 flex flex-col-reverse md:flex-row  overflow-auto">
        <div className="md:w-1/2">
            <div className="space-x-4 flex flex-col items-center">
                <h2 className="text-2xl font-semibold text-center m-4">Client Information</h2>
                <div className="w-2/3">
                    <div className="flex flex-col my-2">
                        <label htmlFor="clientName">Client Name</label>
                        <input 
                            type="text" 
                            name="clientName" 
                            id="clientName"
                            value={client.className}
                            onChange={handleClientChange}
                            className="px-4 py-2 border rounded-md" 
                            required
                        />
                    </div>
                    <div className="flex flex-col my-2">
                        <label htmlFor="clientEmail">Client Email</label>
                        <input 
                            type="text" 
                            name="clientEmail" 
                            id="clientEmail" 
                            value={client.clientEmail}
                            onChange={handleClientChange}
                            className="px-4 py-2 border rounded-md" 
                            required
                            />
                    </div>
                    <div className="flex flex-col my-2">
                        <label htmlFor="clientDescription">Client Description</label>
                        <textarea 
                            rows={2} 
                            name="clientDescription" 
                            id="clientDescription" 
                            value={client.clientDescription}
                            onChange={handleClientChange}
                            className="px-4 py-2 border rounded-md" 
                            required
                        />
                    </div>
                    <div className="flex flex-col my-2">
                        <label htmlFor="clientAddress">Client Address</label>
                        <textarea 
                            rows={2} 
                            name="clientAddress" 
                            id="clientAddress" 
                            value={client.clientAddress}
                            onChange={handleClientChange}
                            className="px-4 py-2 border rounded-md" 
                            required
                        />
                    </div>
                    <div className="flex flex-col my-2">
                        <label htmlFor="clientPhone">Client Phone</label>
                        <input 
                            type="text" 
                            name="clientPhone" 
                            id="clientPhone" 
                            value={client.clientPhone}
                            onChange={handleClientChange}
                            className="px-4 py-2 border rounded-md" 
                            required
                        />
                    </div>
                    <div className="flex flex-col my-2">
                        <label htmlFor="clientPhone">Client Bill</label>
                        <input 
                            type="number" 
                            name="clientBill" 
                            id="clientBill" 
                            value={client.clientBill}
                            onChange={handleClientChange}
                            className="px-4 py-2 border rounded-md" 
                            required
                        />
                    </div>
                    <button type="button" onClick={handleNext} className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-md text-white ">Next</button>
                </div>
            </div>
        </div>
        <div className="md:w-1/2 flex h-40 md:h-full justify-center items-center ">
            <img src="/add-client.png" alt="add-client" className="h-full md:h-80" />
        </div>
    </div>
  )
}

export default InputClientInfo