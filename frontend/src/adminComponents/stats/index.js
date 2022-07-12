import {useEffect, useState} from "react";
import './stats.scss'
import StatsNumber from "./StatsNumber";
import AdminService from "../../services/adminService";
import {useSelector} from "react-redux";


function Stats() {

    const [numbers, setNumbers] = useState([]);
    const [finishedApi, setFinishedApi] = useState(false);



    useEffect(() => {

        AdminService.numbersInfo()
            .then(res => {
                console.log(res.data)
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
                </div>
            }
        </>
    )
}


export default Stats;