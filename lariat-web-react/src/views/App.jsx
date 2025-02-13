import { useState, useEffect } from 'react'
import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
} from  "react-router";

import Head from './MainView/Head.jsx';
import PasteBoard from './PasteboardView/PasteboardView.jsx'
import './PasteboardView/popBoard.css';

import MainPage from './MainView/MainPage.jsx'
import QueryPage from './QueryView/QueryView.jsx'
import InspectPage from './InspectView/InspectView.jsx'
import { CallBox } from './CallBox/QBox.jsx'

import PairsPage from './PairsView/PairsView.jsx'

import Error404 from './../lostClient/404.jsx'


import useLocalStorage from './CustomHooks/UseLocalStorage.js'

export function App() {

    const [tableMemory, setTableMemory] = useLocalStorage("tableMemory");
    useEffect(() => {
        fetch(`http://localhost:8080/api/readTableMemory`, {
          method: "GET"
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(tableMemory)
            setTableMemory(data);
            localStorage.setItem('tableMemory', JSON.stringify(data));
          })
          .catch((error) => console.log(error));
    }, []);

    console.log(tableMemory);  


    const [pasteBoardProps, setPasteBoardProps] = useLocalStorage("pasteBoardProps", {visibility: "hidden", contents: ""});
    const [callBoxProps, setCallBoxProps] = useLocalStorage("callBoxProps", {visibility: "hidden", contents: ""});
    // const [queryProps, setQueryProps] = useState({"isVisible":"visible"})
    // const storeEntries = {};


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
                                {/*<CallBox id={"queryBox"} isCalling={queryProps.isVisible} handleCallChange={setQueryProps}/>*/}
                                {/*<PasteBoard pasteBoardProps={pasteBoardProps} pasteBoardPropsUpdate = {setPasteBoardProps}/>*/}
                                {/*<CallBox id={"queryBox"} callBoxProps={callBoxProps} setCallBoxProps={setCallBoxProps}/>*/}
                            </>
                        }
                    />
                    <Route
                        exact
                        path="/query"
                        element={
                            <>
                                <Head />
                                <QueryPage pasteBoardProps={pasteBoardProps} pasteBoardPropsUpdate = {setPasteBoardProps}/>
                                <PasteBoard id={"pasteboardBody"} pasteBoardProps={pasteBoardProps} pasteBoardPropsUpdate = {setPasteBoardProps}/>
                                {/*<CallBox id={"queryBox"} isCalling={queryProps.isVisible} handleCallChange={setQueryProps}/>*/}
                                <CallBox id={"queryBox"} callBoxProps={callBoxProps} setCallBoxProps={setCallBoxProps}/>
                            </>
                        }
                    />
                    <Route
                        exact
                        path="/inspect"
                        element={
                            <>
                                <Head />
                                <InspectPage pasteBoardProps={pasteBoardProps} pasteBoardPropsUpdate = {setPasteBoardProps}/>
                                <PasteBoard id={"pasteboardBody"} pasteBoardProps={pasteBoardProps} pasteBoardPropsUpdate = {setPasteBoardProps}/>
                                <CallBox id={"queryBox"} callBoxProps={callBoxProps} setCallBoxProps={setCallBoxProps}/>
                        </>
                    }
                    />      
                    <Route
                        exact
                        path="/pairs"
                        element={
                            <>
                                <Head />
                                <PairsPage pasteBoardProps={pasteBoardProps} pasteBoardPropsUpdate = {setPasteBoardProps}/>
                                <PasteBoard id={"pasteboardBody"} pasteBoardProps={pasteBoardProps} pasteBoardPropsUpdate = {setPasteBoardProps}/>
                                <CallBox id={"queryBox"} callBoxProps={callBoxProps} setCallBoxProps={setCallBoxProps}/>
                        </>
                    }
                    />      
                    <Route 
                        path='*' 
                        element={<Error404 />}/>
                        
                    </Routes>
            </BrowserRouter>
        </>
    );
}

