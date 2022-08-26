import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Charts from './pages/Charts';
import Home from './pages/Home';
import Record from './pages/Records';

export default function RoutesSystem() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/records" element={<Record />} />
                <Route path="/charts" element={<Charts />} />
            </Routes>
        </BrowserRouter>
    )
}
