import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PiChart from './PiChart';

const PlaylistModal = ( {show, setShow, playlistInfo} ) => {

  return (
    <div>
      <div>ayo whats goodie</div>
      <Modal
        show={show}
        onHide={() => {setShow(false)}}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
              {playlistInfo === null ? "Loading..." : `${playlistInfo.title} by ${playlistInfo.owner}`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <PiChart genres={playlistInfo.genre_info}></PiChart>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
)};

export default PlaylistModal;