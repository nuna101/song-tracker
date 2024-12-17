import { Button, Card, CloseButton } from 'react-bootstrap';
import './MainLibrary.css'
import { useNavigate, Link } from "react-router-dom";


export default function MainLibrary() {

    const navigate = useNavigate();
    const goToAddPage = () => {
        navigate("/addSongPage")
    }

    const deleteItem = (key) => {
        localStorage.removeItem(key);
        location.reload();
    }

    const getAllItem = () => {
        const allItem = [];
        for(let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            const value = JSON.parse(localStorage.getItem(key));
            allItem.push(value);
        }
        return allItem;
    }

    const libraryItems = getAllItem();
    // const showItem = JSON.parse(localStorage.getItem("allData"))
    // console.log(showItem)
    // console.log(localStorage)
    
    return (
        <div className='main'>
            <div className="header">
                <h1 style={{textAlign: "center"}} className='mb-4'>Songs Tracker</h1>
                <div className="d-grid gap-2">
                    <Button variant="success" size="lg" onClick={goToAddPage}>ADD SONGS</Button>
                    <h2 className="mt-4 mb-3">Your Library</h2>
                    <hr />
                </div>
            </div>
            <div className="songs-library">
                {libraryItems.map(item => {
                    return(
                        <>
                            <Card style={{ width: '18rem', border: 'none'}}  className="pt-4 shadow bg-white rounded m-2 d-inline-block">
                                <div className="img-cover">
                                    <Card.Img variant="top" src={item.albumCover} className="mx-auto" style={{ width: '12rem'}} />
                                </div>
                                <Card.Body>
                                    <div className="song-info my-1">
                                        <Card.Title>{item.songName}</Card.Title>
                                        <Card.Text>{item.albumName}</Card.Text>
                                        <Card.Text>{item.artistName} <hr /></Card.Text>
                                    </div>
                                    <div className="song-review">
                                        <Card.Img src={item.feelingTrack} style={{width: '4rem'}} />
                                        <Card.Text>{item.description}</Card.Text>
                                    </div>
                                    <div className="button">
                                    <Link style={{textDecoration: 'none'}} to='/editPage' state={{songsData : {item}}}><Button variant="outline-warning">EDIT</Button></Link>
                                    <Button variant="outline-danger" onClick={() => {deleteItem(item.songName)}} className="mx-2">DELETE</Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </>
                    );
                })}

                
            </div>
        </div>
    );
}