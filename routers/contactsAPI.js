const Router = require('express').Router();
let Contact = require('../models/contact.model');


//Get all the contacts associated with the user
Router.route('/').get((req, res) => {
    Contact.find( {user: req.query.user} )
        .then(contacts => res.json(contacts))
        .catch(err => res.status(400).json('Error ' + err));
});


//Add new contact from the request sent
Router.route('/add').post((req, res) => {
    
    const user = req.body.user;
    const name = req.body.name;
    const cellphone = req.body.cellphone;
    const homephone = req.body.homephone;
    const workphone = req.body.workphone;
    const email = req.body.email;

    const newContact= new Contact({
        user,
        name,
        cellphone,
        homephone,
        workphone,
        email
    });

    newContact.save()
    .then(() => res.status(200).json('Contact added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});


//Delete based on user
Router.route('/:id').delete((req, res) => {
    Contact.findByIdAndDelete(req.params.id)
        .then( () => res.json("Contact deleted."))
        .catch((err) => res.status(400).json("Error " + err))
})


//Edit Contact based on id with the data sent in the request
Router.route('/edit/:id').post((req, res) => {
    Contact.findById(req.params.id).then(contacts => {
        //Update contact with new information from req
        contacts.user= req.body.user;
        contacts.name = req.body.name;
        contacts.cellphone = req.body.cellphone;
        contacts.homephone = req.body.homephone;
        contacts.workphone = req.body.workphone;
        contacts.email = req.body.email;

        contacts.save()
            .then(() => res.json("Contact updated"))
            .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

// Search for a keyword in the "name" field given a user and "name" 
Router.route('/search/').post((req, res) => {
    Contact.find( {user: req.body.user, name: {$regex:req.body.name, $options: 'i'}
    })

    .then(contacts => res.json(contacts))
    .catch(err => res.status(400).json('Error ' + err));
});

// Searches all fields given a "name" and user. 
Router.route('/search/all').get((req, res) => {
   
    Contact.find( {user: req.body.user, 
                   $or: [{name: {$regex:req.body.name, $options: 'i'}},
                   {homephone: {$regex:req.body.name, $options: 'i'}},
                   {cellphone: {$regex:req.body.name, $options: 'i'}},
                   {workphone: {$regex:req.body.name, $options: 'i'}},
                   {email: {$regex:req.body.name, $options: 'i'}}]
                })

    .then(contacts => res.json(contacts))
    .catch(err => res.status(400).json('Error ' + err));
});




module.exports = Router;