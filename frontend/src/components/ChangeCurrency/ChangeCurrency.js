import { useEffect, useState } from "react";
import {useSelector} from "react-redux";



function ChangeCurrency({adConvertPrice}){
    const {currency} = useSelector((state) => state.currencyStore);
    const [symbol, setSymbol] = useState("");

    useEffect(() => {
        if (currency === "EUR") {
            setSymbol("€");
        }
        if(currency === "USD"){
            setSymbol("$");
        }
        if(currency === "RSD"){
            setSymbol("дин");
        }
    },[currency])

    const checkSymbol = () => {
        if(symbol === "€"){
            return parseFloat(adConvertPrice / 0.98).toFixed(2)
        }
        if(symbol === "$"){
            return parseFloat(adConvertPrice).toFixed(2)
        }
        if(symbol === "дин"){
            return parseFloat(adConvertPrice * 115.27).toFixed(2) 
        }
    }

    return(
    <> 
    {symbol && checkSymbol()} {symbol} 
    </>

    )
}

export default ChangeCurrency;