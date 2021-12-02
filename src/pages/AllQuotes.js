import { useEffect } from "react";
import QuoteList from "../components/quotes/QuoteList";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";  

const AllQuote = ()=>{
    const {sendRequest: loadQuotes,data,status,error} = useHttp(getAllQuotes,true);
    useEffect(()=>{
        loadQuotes();
    },[loadQuotes]);
    if (status==="pending"){
        return <LoadingSpinner />
    }
    if (status === "completed" && error){
        return  <p className="centered">{error}</p>
    }
    if (status === "completed" && !data.length){
        return  <NoQuotesFound />
    }
    if (status === "completed" && !error){
        return  <QuoteList quotes={data}/>
    }
}
export default AllQuote;