import { useEffect, useState } from 'react';
import classes from './Comments.module.css';
import CommentsList from "./CommentsList";
import NewCommentForm from './NewCommentForm';
import useHttp from '../../hooks/use-http';
import { addComment,getAllComments } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';

const Comments = (props) => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const {sendRequest,status,error} = useHttp(addComment);
  const {sendRequest:fetchComments,status:fetchStatus,error:fetchError,data} = useHttp(getAllComments,true);
  const {quoteId} = props;
  useEffect(()=>{
    if (!isAddingComment){
      fetchComments(quoteId);
    }
  },[fetchComments,quoteId,isAddingComment])
  useEffect(()=>{
    if (status === "completed" && !error){
      setIsAddingComment(false);
    }
  },[status,error])
  const addCommentHandler = (comment)=>{
    const commentData = {
      comment:comment,
      quoteId:props.quoteId
    }
    sendRequest(commentData);
  }

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  let content;
  if (fetchStatus === "pending"){
    content = <LoadingSpinner />
  }
  if (fetchStatus === "completed" && fetchError){
    content =  <p className="centered">{fetchError}</p>
  }
  if (fetchStatus === "completed" && !fetchError && data?.length>0){
    content =  <CommentsList comments={data}/>
  }
  if (fetchStatus === "completed" && !fetchError && data?.length===0){
    content =  <p className="centered">No comments yet.</p>
  }

  let content2;

  if (status === "pending"){
    content2 =  <LoadingSpinner />;
  }
  if (status === "completed" && error){
    content2 =  <p className="centered">{error}</p>
  }  
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm onAddComment={addCommentHandler} />}
      {content2}
      {content}
    </section>
  );
};

export default Comments;
