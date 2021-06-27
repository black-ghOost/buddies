/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */
/* eslint-disable radix */
/* eslint-disable no-underscore-dangle */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { articleContext } from '../../App';

export default function Profile() {
    const currentUser = parseInt(localStorage.getItem('currentUser')) || 2;

    const localStore = JSON.parse(localStorage.getItem('user')) || [];
    const [currentArticle, setCurrentArticle] = useContext(articleContext);

    const currentUserPost =
        localStore.length > 0 && localStore.filter((item) => item.userId === currentUser);
    const history = useHistory();
    const handleCurrentArticle = (id, title, body) => {
        const currentArticleInfo = {
            id,
            title,
            body,
        };
        setCurrentArticle(currentArticleInfo); // set this article as current through usecontext hook
        history.push({
            pathname: `/post/${id}`,
        });
    };

    const handleAddNewPost = () => {
        history.push({
            pathname: '/addNewPost',
            state: currentUser,
        });
    };

    const handleDeletePost = (id) => {
        if (localStore.length > 0) {
            const newLocalStore = localStore.filter((item) => item.id !== id);
            localStorage.setItem('user', JSON.stringify(newLocalStore));
            localStorage.setItem('currentUser', `${currentUser}`);
            window.location.reload(true);
        }
    };

    const handleUpdatePost = (id, title, body) => {
        const updatableArticleInfo = {
            id,
            title,
            body,
        };
        setCurrentArticle(updatableArticleInfo);
        history.push({
            pathname: '/updatePost',
            // state: updatableArticleInfo
        });
    };

    return (
        <div>
            <div className="row my-profile px-5">
                <div className="p-4 bg-secondary text-center text-white mt-5">
                    <h2>USER INFO</h2>
                    <h4>User ID: {currentUser || 2}</h4>

                    <button
                        type="button"
                        onClick={() => handleAddNewPost()}
                        className="btn btn-primary"
                    >
                        Add New Post
                    </button>
                </div>
                {currentUserPost.map((post) => (
                    <div className=" col-md-3 card mt-5 " key={post._id}>
                        <div className="card-body  ">
                            <h5 className="card-title p-3">{post.title.slice(0, 35)}</h5>
                            <p className="card-text p-3">
                                {post.body.slice(0, 94)}
                                <span
                                    className="text-primary read-more"
                                    onClick={() =>
                                        handleCurrentArticle(post.id, post.title, post.body)
                                    }
                                >
                                    {' '}
                                    Read More{' '}
                                </span>
                            </p>
                        </div>
                        <div className="card-footer d-flex justify-content-between">
                            <button
                                type="button"
                                onClick={() => handleUpdatePost(post.id, post.title, post.body)}
                                className="btn btn-primary"
                            >
                                {' '}
                                Update
                            </button>
                            <button
                                type="button"
                                onClick={() => handleDeletePost(post.id)}
                                className="btn btn-primary"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
