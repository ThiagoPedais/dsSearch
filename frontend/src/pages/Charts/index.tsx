import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import Filters from '../../components/Filters';
import { barOptions, pieOptions } from './chart-options';
import { buildBarSeries, getGenderChartData, getPlatformChartData } from './helpers';
import './styles.css';



type PieChartData = {
    labels: string[];
    series: number[];
};

type BarChartData = {
    x: string;
    y: number;
};

const initialPieData = {
    labels: [],
    series: []
};

const BASE_URL = 'https://dssearch-thiagopedais.herokuapp.com';


export default function Charts() {

    const [barChartData, setBarChartData] = useState<BarChartData[]>([]);
    const [platformData, setPlatformData] = useState<PieChartData>(initialPieData);
    const [genreData, setGenreData] = useState<PieChartData>(initialPieData);


    useEffect(() => {
        async function getData(){
            const recordsResponse = await axios.get(`${BASE_URL}/records`);
            const gamesResponse = await axios.get(`${BASE_URL}/games`);

            const barData = buildBarSeries(gamesResponse.data, recordsResponse.data.content);
            setBarChartData(barData);

            const platformChartData = getPlatformChartData(recordsResponse.data.content);
            setPlatformData(platformChartData);

            const genderChartData = getGenderChartData(recordsResponse.data.content);
            setGenreData(genderChartData);
        };
        getData();
    }, [])

    return (
        <div className="page-container">
            <Filters link='/records' linkText='VER TABELA' />
            <div className="chart-container">
                <div className="top-related">
                    <h1 className="top-related-title">Jogos mais votados</h1>
                    <div className="games-container">
                        <ReactApexChart
                            options={barOptions}
                            type="bar"
                            width="650"
                            height="650"
                            series={[{ data: barChartData }]}
                        />
                    </div>
                </div>
                <div className="charts">
                    <div className="platform-chart">
                        <h2 className="chart-title">Plataformas</h2>
                        <ReactApexChart
                            options={{ ...pieOptions, labels: platformData?.labels }}
                            type="donut"
                            series={platformData?.series}
                            width= "350"
                        />
                    </div>
                    <div className="gender-chart">
                        <h2 className="chart-title">Gêneros</h2>
                        <ReactApexChart
                            options={{ ...pieOptions, labels: genreData?.labels }}
                            type="donut"
                            series={genreData?.series}
                            width= "350"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
