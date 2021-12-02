import QuoteForm from "../components/quotes/QuoteForm";
import { useHistory } from "react-router-dom";
import useHttp from "../hooks/use-http";
import { addQuote } from "../lib/api";
import { Fragment, useEffect } from "react";
const NewQuote = ()=>{
    const history = useHistory();
    const {sendRequest:sendQuote,status,error} = useHttp(addQuote);
    useEffect(()=>{
        if (status === "completed" && !error){
            history.push("/quotes");
        }
    },[status,error,history])
    const addQuoteHandler = (quoteProps)=>{
        sendQuote(quoteProps);
    };
    let content;
    if (status === "completed" && error){
        content = <p>{error}</p>
    }
    return (
        <Fragment>
            {content}
            <QuoteForm isLoading = {status === "pending"}  onAddQuote = {addQuoteHandler} />
        </Fragment>
    ) 
}
export default NewQuote;