import * as React from 'react';
import { Modal, Button } from 'react-bootstrap';
import Auth from '../auth';

export interface Props {
  setAuth: (t: boolean) => void;
  updateData: () => void;
  loggedIn: boolean;
}

export class Login extends React.Component<Props, any> {
  auth: Auth;

  constructor(props: Props) {
    super(props);
    this.auth = new Auth(this.props.setAuth);
  }

  render() {
    if (this.props.loggedIn) {
      return <Button className="nav-link" onClick={this.auth.logout}>Log Out</Button>;
    } else if (/access_token|id_token|error/.test(window.location.hash)) {
      this.auth.handleAuthentication();
      this.props.updateData();
      return null;
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
          <Button bsStyle="primary" onClick={this.auth.login}>Log In</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default Login;
