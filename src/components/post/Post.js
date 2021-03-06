/* eslint-disable import/no-cycle */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-undef */
import { useContext, useEffect, useState } from 'react';
import { articleContext } from '../../App';

export default function Post() {
    const [comments, setComments] = useState([]);
    const [currentArticle] = useContext(articleContext);

    useEffect(
        () =>
            fetch(`https://jsonplaceholder.typicode.com/comments?postId=${currentArticle.id}`)
                .then((response) => response.json())
                .then((data) => setComments(data)),
        [currentArticle.id]
    );

    return (
        <div>
            <div className="postDetails">
                <h1> {currentArticle.title}</h1>
                <p> "{currentArticle.body}"</p>
            </div>
            <div className="commentSection">
                <h2>Comments:</h2>
                <ul>
                    {comments.map((comment) => (
                        <li>
                            <div className="singleComment">
                                {/* <div>
                                    <img src={user} alt="" width="100px" />
                                </div> */}
                                <div>
                                    <h4>Email: {comment.email}</h4>
                                    <p> {comment.body}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
