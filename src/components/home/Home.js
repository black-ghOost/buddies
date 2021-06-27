/* eslint-disable import/no-cycle */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { articleContext, localStorageContext } from '../../App';

export default function Home() {
    const [post, setPost] = useState([]);
    const [store, setStore] = useContext(localStorageContext);
    const localStore = JSON.parse(localStorage.getItem('user')) || [];

    if (post.length && store.length < 1 && localStore.length === 0) {
        localStorage.setItem('user', JSON.stringify(post));
        const storageData = JSON.parse(localStorage.getItem('user'));
        setStore(storageData);
    }

    const [visiblePost, setVisiblePost] = useState(10);
    const [currentArticle, setCurrentArticle] = useContext(articleContext);
    const history = useHistory();
    const handleCurrentArticle = (id, title, body) => {
        const currentArticleInfo = {
            id,
            title,
            body,
        };
        setCurrentArticle(currentArticleInfo);
        history.push({
            pathname: `/post/${id}`,
        });
    };

    const showMoreItems = () => {
        setVisiblePost((preVal) => preVal + 10);
    };

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((res) => res.json())
            .then((data) => {
                setPost(data);
            });
    }, []);

    return (
        <div style={{ overflowX: 'hidden' }}>
            <div className="row row-cols-md-6 px-5 blog">
                {localStore.length > 0 &&
                    localStore.slice(0, visiblePost).map((post) => (
                        <div className="cards col mt-5 mb-3 border rounded m-3 p-3" key={post._id}>
                            <h5 className="card-title">{post.title.slice(0, 30)}</h5>
                            <p className="card-text">
                                {post.body.slice(0, 95)} ...
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
                    ))}
            </div>
            {visiblePost <= post.length && (
                <div className="text-center my-4">
                    <button type="button" onClick={showMoreItems} className=" btn btn-warning ">
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
}
