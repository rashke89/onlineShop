import {useEffect, useState} from "react";
import './stats.scss'
import StatsNumber from "./StatsNumber";
import AdminService from "../../services/adminService";


function Stats() {

    const [numbers, setNumbers] = useState([]);
    const [finishedApi, setFinishedApi] = useState(false);



    useEffect(() => {

        AdminService.getStats()
            .then(res => {
                setNumbers(res.data);
                setFinishedApi(true);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])


    return (
        <>
            {finishedApi &&
                <div className="row">
                    <StatsNumber number={numbers.users} label="users"/>
                    <StatsNumber number={numbers.products} label="products"/>
                    <StatsNumber number={numbers.emails} label="emails"/>
                    <StatsNumber number={numbers.subs} label="Subs"/>

                </div>
            }
        </>
    )
}


export default Stats;