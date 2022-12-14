import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Filters from '../../components/Filters';
import { formatDate } from '../../helpers';
import Pagination from './Pagination';
import './styles.css';
import { RecordsResponse } from './types';


const BASE_URL = 'https://dssearch-thiagopedais.herokuapp.com';

export default function Record() {

    const [recordsResponse, setRecordsResponse] = useState<RecordsResponse>()
    const [activePage, setActivePage] = useState(0);

    useEffect(() => {
        axios.get(`${BASE_URL}/records?linesPerPage=12&page=${activePage}`)
            .then(res => {
                setRecordsResponse(res.data);
            })
            .catch(() => {
                console.error("Erro na responsta")
            })
    }, [activePage])

    const handlePageChange = (index: number) => {
        setActivePage(index)
    }

    return (
        <div className="page-container">
           <Filters link='/charts' linkText='VER GRÁFICO' />
            <table className="records-table" cellPadding={0} cellSpacing={0}>
                <thead>
                    <tr>
                        <th>INSTANTE</th>
                        <th>NOME</th>
                        <th>IDADE</th>
                        <th>PLATAFORMA</th>
                        <th>GÊNERO</th>
                        <th>TÍTULO DO GAME</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        recordsResponse?.content.map(record => (
                            <tr key={record.id}>
                                <td>{formatDate(record.moment)}</td>
                                <td>{record.name}</td>
                                <td>{record.age}</td>
                                <td className="text-secondary">{record.gamePlatform}</td>
                                <td>{record.genreName}</td>
                                <td className="text-primary">{record.gameTitle}</td>
                            </tr>
                        ))
                    }

                </tbody>
            </table>
            <Pagination
                activePage={activePage}
                goToPage={handlePageChange}
                totalPages={recordsResponse?.totalPages}
            />
        </div>
    )
}
