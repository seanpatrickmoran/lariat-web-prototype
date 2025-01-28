import { useState, useEffect } from 'react'
import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
} from  "react-router";

import Head from './MainView/Head.jsx';
import MainPage from './MainView/MainPage.jsx'
import QueryPage from './QueryView/QueryView.jsx'
import InspectPage from './InspectView/InspectView.jsx'
import useLocalStorage from './CustomHooks/UseLocalStorage.js'
import PasteBoard from './PasteboardView/PasteboardView.jsx'
import './PasteboardView/popBoard.css';

export function App() {

    const [pasteBoardProps, setPasteBoardProps] = useState({visibility: "hidden", contents: []});

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route
                        exact
                        path="/"
                        element={
                            <>
                                <Head />
                                <MainPage />
                                <PasteBoard />
                            </>
                        }
                    />
                    <Route
                        exact
                        path="/query"
                        element={
                            <>
                                <Head />
                                <QueryPage />
                                <PasteBoard />
                            </>
                        }
                    />
                    <Route
                        exact
                        path="/inspect"
                        element={
                            <>
                            <Head />
                            <InspectPage />
                            <PasteBoard />
                        </>
                    }
                    />      

{/*                    <Route
                        exact
                        path="/pairs"
                        element={
                            <>
                            <Head />
                            <PairsPage />
                            <PasteBoard />
                        </>
                    }
                    />   */}

                </Routes>
            </BrowserRouter>
            {/*<button onClick={sendData}>Get data</button>*/}
        </>
    );
}

