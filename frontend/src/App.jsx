import React from 'react'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Root from './pages/Root';
import Home from './pages/home/Home';
import DefaultHome from './pages/home/home-routes/DefaultHome';
import Clients from './pages/home/home-routes/clients/Clients';
import DefaultClients from './pages/home/home-routes/clients/clients-routes/DefaultClients';
import ClientView from './pages/home/home-routes/clients/clients-routes/ClientView';
import MySpace from './pages/home/home-routes/my-space/MySpace';
import Contacts from './pages/home/home-routes/contacts/Contacts';
import AddClient from './pages/home/home-routes/add-clients/AddClient';
import Settings from './pages/home/home-routes/settings/Settings';

const App = () => {
    const router = createBrowserRouter([
        { path: "/", element: <Root /> },
        { 
            path: "/home", 
            element: <Home />,
            children: [
                { 
                    path: "", 
                    element: <DefaultHome />,
                },
                { 
                    path: "clients", 
                    element: <Clients />,
                    children: [
                        { 
                            path: "", 
                            element: <DefaultClients />,
                        },
                        { 
                            path: ":clientId", 
                            element: <ClientView />,
                        },
                    ]
                },
                { 
                    path: "my-space", 
                    element: <MySpace />,
                    children: []
                },
                { 
                    path: "contacts", 
                    element: <Contacts />,
                    children: []
                },
                { 
                    path: "add-client", 
                    element: <AddClient />,
                    children: []
                },
                { 
                    path: "settings", 
                    element: <Settings />,
                    children: []
                },   
            ]
        }
    ]);

    return (
        <RouterProvider router={router} />
    )
}

export default App