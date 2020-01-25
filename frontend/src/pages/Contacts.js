import React from 'react'
import Contact from '../components/contact_component'
import axios from 'axios'
import { CommentActions } from 'semantic-ui-react'



class Contacts extends React.Component {
    constructor() {
        super()
        this.state = {contacts: []}
    }
    componentDidMount() {
        axios.get("https://still-stream-56632.herokuapp.com:80/api/contacts") 
            .then( response => {
                const contacts = response.data
                this.setState({ contacts })
            })
    }   
    
    render(){    
        let contacts = this.state.contacts
        console.log(contacts)
        return (
            <div>
                {contacts.map(contact => 
                    <Contact key={contacts._id}
                        contact={contact}
                    />
                    
                )}
            </div>
        )
    }
}

export default Contacts