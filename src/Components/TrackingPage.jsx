import { useLocation } from 'react-router-dom';
import { Button,  Container , Row, Col, Form } from 'react-bootstrap';
import greatBorder from '../assets/great-border.png'
import okBorder from '../assets/ok-border.png'
import sosoBorder from '../assets/soso-border.png'
import kindabadBorder from '../assets/kindabad-border.png'
import worstBorder from '../assets/worst-border.png'
import './TrackingPage.css'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

export default function TrackingPage() {
    const location = useLocation();
    const { songsData } = location.state;
    console.log(songsData)

    const navigate = useNavigate();
    const goToAddPage = () => {
        navigate(-1)
    }

    const [trackingData, setTrackingData] = useState({
        albumCover: songsData.result.album.images[0].url,
        songName: songsData.result.name,
        albumName: songsData.result.album.name,
        artistName: songsData.result.artists[0].name,
        feelingTrack: null,
        description: ""
    })

    const addToLibrary = () => {
        if(trackingData.feelingTrack == null) {
            return alert("You must choose a emoji!!!")
        }

        try {
            localStorage.setItem(localStorage.length, JSON.stringify(trackingData))
            alert("Add to Library Successfully!")
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }


    return(
        <>
            <Container className='p-5' style={{border: '1px solid rgb(185, 181, 181)', borderRadius: '10px'}} >
                <Row>
                    <Col style={{textAlign: 'center'}} xs={12} sm={12} md={12} lg={6} >
                        <img src={songsData.result.album.images[0].url} style={{width: "45%"}} className='my-4' />
                        <h3>Song Name : {songsData.result.name}</h3>
                        <h4>Album : {songsData.result.album.name}</h4>
                        <h4>Artist : {songsData.result.artists[0].name}</h4>
                        
                    </Col>
                    <Col xs={12} sm={12} md={12} lg={6}>
                        <h2>How was this song?</h2>
                        <Form className="my-5">
                            <Row className='feeling-form'>
                                <Col><Form.Check  type="radio" name="feeling" onClick={() => {setTrackingData({...trackingData, feelingTrack: greatBorder})}}  label={<img src={greatBorder} className='feeling-button'/>} /></Col>
                                <Col><Form.Check  type="radio" name="feeling" onClick={() => {setTrackingData({...trackingData, feelingTrack: okBorder})}}  label={<img src={okBorder}  className='feeling-button'/>} /></Col>
                                <Col><Form.Check  type="radio" name="feeling" onClick={() => {setTrackingData({...trackingData, feelingTrack: sosoBorder})}}  label={<img src={sosoBorder}  className='feeling-button'/>} /></Col>
                                <Col><Form.Check  type="radio" name="feeling" onClick={() => {setTrackingData({...trackingData, feelingTrack: kindabadBorder})}}  label={<img src={kindabadBorder}  className='feeling-button'/>} /></Col>
                                <Col><Form.Check  type="radio" name="feeling" onClick={() => {setTrackingData({...trackingData, feelingTrack: worstBorder})}}  label={<img src={worstBorder} className='feeling-button'/>} /></Col>
                            </Row>
                        </Form>
                        <Form className='my-5'>
                            <h2 className='my-5'>Describe your feeling</h2>
                            <Form.Control as="textarea" rows={4} placeholder="Your feeling..." onChange={e => {setTrackingData({...trackingData, description: e.target.value})}} />
                        </Form>
                        <Form>
                            <Row>
                                <Col><Button variant='outline-warning' style={{width: '100%'}} onClick={goToAddPage} >CANCEL</Button></Col>
                                <Col><Button variant='outline-success' style={{width: '100%'}} onClick={addToLibrary}>ADD</Button></Col>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
}