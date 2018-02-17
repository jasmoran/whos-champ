import * as React from 'react';
import { Modal, Button } from 'react-bootstrap';

export interface Props {
  loggedIn: boolean;
  login: () => void;
  logout: () => void;
}

export class Login extends React.Component<Props, any> {
  render() {
    if (this.props.loggedIn) {
      return <Button className="nav-link" onClick={this.props.logout}>Log Out</Button>;
    }

    return (
      <Modal show={true} onHide={Function()} backdrop="static">
        <Modal.Header>
          <Modal.Title className="modal-title">Log In Required</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You need to be logged in to use Who's Champ.
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="primary" onClick={this.props.login}>Log In</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default Login;
