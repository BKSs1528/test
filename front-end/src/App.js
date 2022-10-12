import './App.css';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import db from "./db.json"

function App() {
  const [show, setShow] = useState(false);
  // const [pop,setpop] = useState({})
  const [pop,setPop]= useState({})


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const popuphandle = (item)=>{
    setPop(item)
    handleShow()
  }
  return (
    <div className='card-container'>
      {
        db.map(data=>{
          return(
            <>
              <div className='main-container' onClick={()=>popuphandle(data)} key={data.id}>
                <div className='img-container'>
                  <img src={data.thumbnail.large} alt='myPic'/>
                  {/* <div className='overlay'>
                    <div className='content'><h1>Learn</h1></div>
                  </div> */}
                </div>
                <div className='dots' >
                  colors dots
                </div>
                <div className='head-conatiner' >
                  <h3>{data.title}</h3>
                </div>
                <div className='text-container'>
                  <p>{data.content}</p>
                </div>
                <div className='footer' >
                  <span className='author'>{data.author.name}-{data.author.role}</span>
                  <span className='date'>Nov 25, 2020</span>
                </div>
              </div>
              <Modal 
              show={show} onHide={handleClose} animation={false} centered
              style={{ marginLeft: "40%", marginTop: "10%", width: "500px", height: "400px", lineHeight: "25px", textAlign: "center" }}
              >
                <Modal.Body>
                <div className="main-popup">
                <div className="conatiner-popup" style={{'borderRadius':"5px"}}>
                  <div className='popup-image'>
                    {/* <img src={pop.thumbnail.small} alt="pic" /> */}
                  </div>
                  <div>
                    <h3>{pop.title}</h3>
                  </div>
                  <div>
                    <p>{pop.content}</p>
                  </div>
                  <div>
                    {/* <span><img style={{width:"50%"}} src={pop.author.avatar} alt='pic'/></span> */}
                    {/* <span>{pop.author.name}-{pop.author.role}</span> */}
                  </div>
                  <Button onClick={handleClose}>Close</Button>
                </div>
              </div>
                </Modal.Body>
              </Modal>
            </>
          )
        })
      }
    </div>
  );
}

export default App;
