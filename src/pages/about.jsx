import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';



const about = () => {
    const [getData, SetgetData] = useState([]);
    const [selectInput, SetselectInput] = useState('');

    const router = useRouter();
    const { page } = router.query;
    const itemsPerPage = 10;
    const totalItems = filtered.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage)-1;

    const api = 'https://api.magicthegathering.io/v1/cards?page=2';
    async function fetchData() {
        const response = await fetch(api);
        const result = await response.json();
        const { cards } = result
        SetgetData(cards)

    }
    function handleChange(event) {
        SetselectInput(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log(selectInput);
    }

    const searchFiltered = (arr) => {
        return arr.filter(f => f.artist.toLowerCase().includes(selectInput));
    }

    const filtered = searchFiltered(getData);

    useEffect(() => {
        fetchData();
    }, [])

    return (
        <>
            <header className="navbar-dark bg-dark text-white">
                <div className='container'>
                    <Navbar className=" justify-content-between">
                        <h1>Mario<span>Sports</span></h1>
                        <Form inline >
                            <Row>
                                <Col xs="auto">
                                    <Form.Control
                                        type="text"
                                        placeholder="Search"
                                        id="inputBox"
                                        value={selectInput}
                                        onChange={handleChange}
                                        className=""
                                    />
                                </Col>
                                <Col xs="auto">
                                    <Button type="button" onClick={handleSubmit}>Submit</Button>
                                </Col>
                            </Row>
                        </Form>
                    </Navbar>
                </div>
            </header>
            <section className='bg-dark pt-5 pb-5'>
                <div className='container'>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>SetName</th>
                                <th>Paragraph</th>
                                <th>Artist</th>
                                <th>Number</th>

                            </tr>
                        </thead>
                        <tbody>
                            {
                                filtered && filtered.length && filtered.map((data, index) => {
                                    return (

                                        <tr key={index + 1}>
                                            <td>{index + 1}</td>
                                            <td>{data.imageUrl}</td>
                                            <td>{data.setName}</td>
                                            <td>{data.text}</td>
                                            <td>{data.artist}</td>
                                            <td>{data.number}</td>
                                        </tr>
                                    )
                                })
                            }


                        </tbody>
                    </Table>
                </div>
            </section>
        </>
    )
}

export default about
