import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";
import CreateTicket from "./pages/CreateTicket";
import TicketDetails from "./pages/TicketDetails";
import MyTickets from "./pages/MyTickets";
import AgentDashboard from "./pages/AgentDashboard";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";


function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* Authentication */}
                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />


                {/* Application */}
                <Route
                    path="/*"
                    element={

                        <ProtectedRoute>

                        <div className="
                            min-h-screen
                            bg-[#eaf5f3]
                            flex
                        ">

                            <Sidebar />

                            <div className="flex-1">

                                <Navbar />

                                <Routes>

                                    <Route
                                        path="/"
                                        element={<Dashboard />}
                                    />

                                    <Route
                                        path="/create-ticket"
                                        element={<CreateTicket />}
                                    />

                                    <Route
                                        path="/tickets/:id"
                                        element={<TicketDetails />}
                                    />

                                    <Route
                                        path="/my-tickets"
                                        element={<MyTickets />}
                                    />

                                    <Route
                                        path="/agent-dashboard"
                                        element={<AgentDashboard />}
                                    />

                                </Routes>

                            </div>

                        </div>

                        </ProtectedRoute>
                    }
                />

            </Routes>

        </BrowserRouter>
    );
}


export default App;