function StatsNumber({number, label}) {

    return (
        <>
            <div className="col-md-5 p-2">
                <div className="stats-numbers-wrapper">
                    <h3>{label}</h3>
                    <p>{number}</p>
                </div>

            </div>
        </>
    )
}
export default StatsNumber;
