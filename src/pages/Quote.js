import { Fragment, useEffect } from "react";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
const Quote = () => {
  const match = useRouteMatch();
  const { quoteId } = useParams();
  const {sendRequest:getThisQuote,status,data:quote,error} = useHttp(getSingleQuote,true);
  useEffect(()=>{
    getThisQuote(quoteId);
  },[getThisQuote,quoteId]);
  if (status === "pending"){
    return <LoadingSpinner />
  }
  if (error){
    return <p className="centered">{error}</p>
  }
  if (!quote.text){
    return <p className="centered">No quote found!</p>
  }
  return (
    <Fragment>
      <HighlightedQuote author={quote.author} text={quote.text} />
      <Route path={match.path} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Comments
          </Link>
        </div>
      </Route>

      <Route path={`${match.path}/comments`}>
        <Comments quoteId={quoteId}/>
      </Route>
    </Fragment>
  );
};
export default Quote;
