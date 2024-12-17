import './AddSongPage.css'
import { Button, Card, Container , InputGroup, FormControl, Row } from 'react-bootstrap';
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const CLIENT_ID = "8a98e2d0911e4998825333479b788baa";
const CLIENT_SEC = "ced2be5d2af94085a401c22b82a36e33";


export default function AddSongPage() {

    const navigate = useNavigate();
    const goToHomePage = () => {
        navigate("/")
    }

    const [searchInput, setSearchInput] = useState("");
    const [accessToken, setAccessToken] = useState("");
    const [allResults, setAllResults] = useState([]);
    const [artistFilter, setArtistFilter] = useState('');
    const [albumFilter, setAlbumFilter] = useState('');
    const debounceTimeout = useRef(null);

    useEffect(() => {
        //API Access Token
        var authParameters = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SEC
        }
        fetch('https://accounts.spotify.com/api/token', authParameters)
            .then(result => result.json())
            .then(data => setAccessToken(data.access_token))
    }, [])

    const fetchData = async(searchInput) => {
        try {
            if(!searchInput) {
                setAllResults([]);
                return;
            }

            const response = await axios.get('https://api.spotify.com/v1/search', {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                },
                params: {
                    q: searchInput,
                    type: 'track,album,artist',
                    limit: 50
                }
            });

            const tracks = response.data.tracks.items;
            setAllResults(tracks);
            // console.log(allResults) //result.album.name result.artist[0].name  result.album.image[0]


        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e) => {
        setSearchInput(e.target.value);
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }
        
        debounceTimeout.current = setTimeout(() => {
            fetchData(searchInput);
        });
    }

    //Search
    
    return(
        <>
            <Container>
                <div className="d-grid gap-2">
                    <Button variant="warning" size="lg" onClick={goToHomePage}>Go Back</Button>
                    <hr />
                </div>
                <InputGroup size="lg" className="mb-3">
                    <FormControl placeholder="Search any songs" type="input"
                        onChange={e => handleChange(e)}
                    />
                    <Button onClick={e => handleChange(e)}>Search</Button>
                </InputGroup>
            </Container>
            <Container>
                <Row className="mx-2 row row-cols-4" >
                    {allResults.map(result => {
                        return(
                            <Card className="m-3" style={{width: '16rem'}}>
                                <Card.Img src={result.album.images[0].url} className="p-3" style={{borderRadius: "10px"}} />
                                <Card.Body>
                                    <Card.Title>{result.name}</Card.Title>
                                    <Card.Text>{result.album.name}</Card.Text>
                                    <Card.Text>{result.artists[0].name}</Card.Text>
                                    <Link style={{textDecoration: 'none'}} to='/trackingPage' state={{songsData : {result}}}><Button variant="outline-success">ADD</Button></Link>
                                </Card.Body>
                            </Card>
                        );
                    })}
                </Row>
            </Container>
        </>
    );
}