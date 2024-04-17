import Head from 'next/head'
import Image from 'next/image'
// import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { useEffect, useState } from 'react';




export default function Home() {
  const [finalData, SetfinalData] = useState([]);
  const [inputValue, SetinputValue] = useState('');

  console.log(inputValue);
  const apiUrl = "https://www.amiiboapi.com/api/amiibo/?name=mario"
  async function getData() {
    const response = await fetch(`${apiUrl}`);
    const result = await response.json();
    const { amiibo } = result
    console.log(amiibo);
    SetfinalData(amiibo);

  }

  const handleInputChange = (event) => {
    SetinputValue(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Input Value submitted:", inputValue);
  }

  //Our search filter function
  const searchFilter = (array) => {
    return array.filter(
      (el) => el.name.toLowerCase().includes(inputValue)
    )
    }

    //Applying our search filter function to our array of countries recieved from the API
  const filtered = searchFilter(finalData)

  useEffect(() => {
    getData();
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
                    value={inputValue}
                    onChange={handleInputChange}
                    className=" mr-sm-2"
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
      <div className='container pt-4'>
        <div className='row'>


          {
            filtered && filtered.length && filtered.map((a) => {
              return (
                <div className='col-md-4'>
                  <Card key={a.tail} className='mt-4'>
                    <Card.Img variant="top" src={a.image} alt={a.name} style={{ height: 250 }} />
                    <Card.Body>
                      <Card.Title>{a.name}</Card.Title>
                      <Card.Text>{a.description || 'No description available'}</Card.Text>
                      <Button variant="primary">Go somewhere</Button>
                    </Card.Body>
                  </Card>
                </div>
              )
            })

          }

        </div>
      </div>
    </>
  )
}
