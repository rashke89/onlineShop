import SideBar from "../../adminComponents/sideBar/SideBar";
import { Outlet } from "react-router-dom";

function Dashboard() {

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        <SideBar />
                    </div>

                    <div className="col-md-9">
                        <Outlet />
                    </div>
                </div>
            </div>


        </>
)
}

export default Dashboard;
