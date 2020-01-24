import React from 'react'
import { List, Header, Form, Divider, Button, Modal, Icon } from 'semantic-ui-react'
import axios from 'axios'

async function getContact() {
    try {

    } catch(error) {

    }
}

async function handleEdit() {
    try {

    } catch(error) {

    }
}

async function handleDelete() {
    try {

    } catch(error) {

    }
}


class Contact extends React.Component {

    render(){    
        return (
            <>

                <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css"/>
                <List>
                    <Icon  name='address book' /> <p>Name: {this.props.contact.name} </p> 
                    <Icon  name='phone' /> <p>Cell Phone: {this.props.contact.cellphone} </p> 
                    <Icon  name='phone' /> <p>Home Phone: {this.props.contact.homephone} </p> 
                    <Icon  name='phone' /> <p>Work Phone: {this.props.contact.workphone} </p> 
                    <Icon  name='envelope' /> <p>Email: {this.props.contact.email} </p>
                </List>
                <Button floated="right" icon="pencil" onClick={handleEdit} /> <br /> <br />
                <Modal trigger={<Button floated="right" >Edit</Button>} closeIcon>
                    <Header icon='archive' content='Archive Old Messages' />
                    <Modal.Content>
                    <p>
                        Are you sure you want to delete this contact?
                    </p>
                    </Modal.Content>
                    <Modal.Actions>
                    <Button color='red'>
                        <Icon name='remove' /> No
                    </Button>
                    <Button color='green' onClick={handleDelete}>
                        <Icon name='checkmark' /> Yes
                    </Button>
                    </Modal.Actions>    
                </Modal>
                <br /><br />
                <Divider /> 
            </>

        )
    }
}
export default Contact