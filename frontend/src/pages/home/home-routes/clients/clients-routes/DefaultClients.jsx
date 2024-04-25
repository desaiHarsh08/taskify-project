import React, { useEffect, useState } from "react"

import { Pagination } from "flowbite-react";

import Heading from "../../../../../components/global/heading/Heading"
import ClientRow from "../../../../../components/clients/default-clients/ClientRow";
import { fetchAllClients } from "../../../../../app/apis/clientsApi";

const DefaultClients = () => {
    const [clientsArr, setClientsArr] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchClient, setSearchClient] = useState('');
    const [clientsTabArr, setClientsTabArr] = useState([
        { tabLabel: "All Clients", status: true, totalClients: 12 },
        { tabLabel: "Ongoing", status: false, totalClients: 3 },
        { tabLabel: "Payment Received", status: false, totalClients: 4 },
        { tabLabel: "Closed", status: false, totalClients: 5 },
    ]);

    useEffect(() => {
        if (searchClient === '') {
            // Fetch the clients list on the basis of client's tab selected
        }
    }, [searchClient]);

    useEffect(() => {
        fetchAllClients().then((data) => {
            console.log(data.data.payload);
            setClientsArr(data.data.payload);
        }).catch((error) => console.log(error));
    }, []);

    const onPageChange = (page) => setCurrentPage(page);

    const handleTabClick = (index) => {
        let newClientsTabArr = [...clientsTabArr];
        newClientsTabArr = newClientsTabArr.map((clientTab, i) => {
            if (i === index) {
                clientTab.status = true;
            }
            else {
                clientTab.status = false;
            }
            return clientTab;
        });
        setClientsTabArr(newClientsTabArr);
    }

    const handleSearchClient = (e) => {
        e.preventDefault();
        let newClientsArr = [...clientsArr];
        newClientsArr = newClientsArr.map((client) => {
            if (
                client.clientName.includes(searchClient) ||
                client.clientDescription.includes(searchClient) ||
                client.clientNote.includes(searchClient)
            ) {
                return client;
            }
        })
    }

    const renderClientsTab = (
        <div className="mt-7 w-full">
            <ul className="flex gap-7 border-b min-w-[470px] md:w-full ">
                {clientsTabArr.map((clientTab, index) => (
                    <li onClick={() => { handleTabClick(index) }} className={`cursor-pointer flex pb-2 ${clientTab.status ? 'font-medium border-b border-blue-500' : ''} items-center gap-1 flex justify-center `}>
                        <p className={`${clientTab.status ? 'text-blue-500' : ''}`}>{clientTab.tabLabel}</p>
                        <p className={`flex justify-center items-center w-[20px] h-[20px] text-xs rounded-full ${clientTab.status ? 'text-blue-500' : ''} bg-slate-200`}>{clientTab.totalClients}</p>
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <div className="w-full text-slate-600 h-full text-[14px] overflow-h idden">
            {/* Page heading */}
            <div>
                <Heading pageHeading={"Clients"} />
                <p>View all of your clients</p>
            </div>

            {/* Tabs */}
            {renderClientsTab}

            {/* Clients */}
            <div id="default-clients-list-container" className="h-3/4 md:h-[79%] flex flex-col justify-between overflow-hidden">
                <div className="list-container">
                    {/* Search Client */}
                    <form onSubmit={handleSearchClient} className="flex gap-3 items-center my-7">
                        <div>
                            <label htmlFor=""></label>
                            <input
                                type="text"
                                name="searchField"
                                id="searchField"
                                value={searchClient}
                                onChange={(e) => { setSearchClient(e.target.value) }}
                                className="px-4 py-1 border border-slate-300 outline-none rounded-md"
                            />
                        </div>
                        <button className="px-4 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md">Search</button>
                    </form>
                    {/* Clients List */}
                    <div className="w-full h-[56%] overflow-auto">
                        <div className="table min-w-[691px] md:w-full border rounded-md text-[14px]">
                            <div className="thead w-full bg-slate-100 mb-2 py-2 flex text-center text-slate-600">
                                <p className="w-[16.66%]">Sr. No</p>
                                <p className="w-[16.66%]">Client Name</p>
                                <p className="w-[16.66%]">Visited</p>
                                <p className="w-[16.66%]">Status</p>
                                <p className="w-[16.66%]">Payment</p>
                                <p className="w-[16.66%]">Bill</p>
                            </div>
                            <div className="tbody  overflow-hidden pb-7">
                                {clientsArr.map((client, index) => (
                                    <>
                                    <ClientRow key={`client-${index}`} client={client} index={index} />
                                    </>
                                ))}
                            </div>
                        </div>
                    </div>
                {/* <div className="flex overflow-x-auto justify-center">
                    <Pagination showIcons layout="table" currentPage={currentPage} totalPages={100} onPageChange={onPageChange} />
                </div> */}
                </div>
            </div>
        </div>
    )
}

export default DefaultClients