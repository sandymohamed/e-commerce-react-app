import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { selectUser } from '../../redux/reducers/userSlice'
// --------------------------------------------------------------------

export default function ProfileDetailsPage() {


    const user = useSelector(selectUser);



  return (
    <Container className=' p-2'>
        <Row className='row-data '>
            <Col xs={12} sm={4} className='text-capitalize' >first name: </Col>
            <Col xs={12} sm={8}>{user?.firstName}</Col>
        </Row>
        <Row className='row-data '>
            <Col xs={12} sm={4} className='text-capitalize' >last name: </Col>
            <Col xs={12} sm={8}>{user?.lastName}</Col>
        </Row>
        <Row className='row-data '>
            <Col xs={12} sm={4} className='text-capitalize' >email: </Col>
            <Col xs={12} sm={8}>{user?.email}</Col>
        </Row>
        <Row className='row-data '>
            <Col xs={12} sm={4} className='text-capitalize' > User type:  </Col>
            <Col xs={12} sm={8}>{user?.isAdmin ? 'Admin': 'Customer'}</Col>
        </Row>
  
    </Container>
  )
}
