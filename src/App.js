/* eslint-disable no-unused-vars */
/* eslint-disable import/no-cycle */
import { createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import AddPost from './components/addPost/AddPost';
import Home from './components/home/Home';
import Post from './components/post/Post';
import Profile from './components/profile/Profile';
import Footer from './components/shared/footer/Footer';
import Navbar from './components/shared/navbar/Navbar';
import Update from './components/updatePost/Update';
import User from './components/user/user/User';

export const articleContext = createContext();
export const localStorageContext = createContext();

export default function App() {
    const [currentUser, setCurrentUser] = useState(2);
    const [store, setStore] = useState([]);
    const [currentArticle, setCurrentArticle] = useState({});
    return (
        <localStorageContext.Provider value={[store, setStore]}>
            <articleContext.Provider value={[currentArticle, setCurrentArticle]}>
                <Router>
                    <Navbar />
                    <Switch>
                        <Route exact path="/">
                            <Home />
                        </Route>
                        <Route path="/home">
                            <Home />
                        </Route>
                        <Route path="/profile">
                            <Profile />
                        </Route>
                        <Route exact path="/users">
                            <User />
                        </Route>
                        <Route path="/addPost">
                            <AddPost />
                        </Route>
                        <Route path="/post/:postId">
                            <Post />
                        </Route>
                        <Route path="/updatePost">
                            <Update />
                        </Route>

                        <Route path="*">
                            <h2> Opps! page not found</h2>
                        </Route>
                    </Switch>
                    <Footer />
                </Router>
            </articleContext.Provider>
        </localStorageContext.Provider>
    );
}
