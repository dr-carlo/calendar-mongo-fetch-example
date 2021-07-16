
const User = require('./models/usuarios');
const Evento = require('./models/eventos');
const UserSession = require('./models/sesiones');
const cors = require('cors');

module.exports = (app) => {

    app.post('/api/auth', cors(), (req, res) => {
        const { body } = req;
        const { email, password } = body;

        if (!body.email){
            return res.send({
                success: false,
                message: 'Error: email vacio.. '
            });
        } else {
        User.find({
            email: email  // COMPARA EN MONGO EL EMAIL
        }, (err, users) => {
            if(err){
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                });
            } else {
            const user = users[0]; 
            if(!user.validPassword(password)){
                return res.send({
                    success: false,
                    message: 'Error: Contraseña invalida'
                });
            } else {
                        
            const newUserSession = new UserSession();
            newUserSession.userId = user._id;
            newUserSession.save((err, doc) => {
                if(err){
                    console.log(err);
                    return res.send({
                        success: false,
                        message: 'Server error..'
                        });
                    }
                
                console.log(' \n token nro => ', doc._id, ' \n') 
                return res.send({
                    success: true,
                    message: 'Nueva Sesion iniciada',
                    token: doc._id,
                    ok: true,
                    name: doc.name,
                    uid: doc.email
                    });
                });
            } }
        });
        }
    });

    app.post('/api/auth/new', cors(), (req, res) => {
        const { body } = req;
        const { email, password, name } = body;
 
        if (!body.email){
            return res.send({
                success: false,
                message: ' email: indefinidoo.. '
            })
        } else {
            User.find ({
                email: email.email 
                }, (err, previousUsers) => {
                    if(err){
                    return res.send({
                        success: false,
                        message: 'NO guardado en server..'
                    }); 
                    } else if (previousUsers.length > 0){
                        return res.send({
                            success: false,
                            message: 'Error: Usuario existente..'
                        });
                    } else {
                        const newUser = new User();
                        newUser.email = email;
                        newUser.name = name;
                        newUser.password = newUser.generateHash(password);
                        
                        newUser.save((err, doc) => {
                        if(err){
                            console.log(err);
                            return res.send({
                                success: false,
                                message: 'Error: Server error..'
                            });
                        }
                        return res.send({                            
                            success: true,
                            message: 'UsuarioNuevo Creado',                            
                            token: doc._id, 
                            ok: true,
                            name: doc.name,
                            uid: doc.email
                        });
                    });
                }      
            });
        }
    });

    app.get('/api/auth/renew', cors(), (req, res) => { 
        
        res.send({
            success: true,
            message: 'Checkeo realizado..', 
            token: id, // CREACION DEL TOKEN A PARTIR DEL _id
            ok: true 
        })     
                          
    });

    app.post('/api/events', cors(), (req, res) => { 
        const { body } = req;
        const { title, notes } = body;               
        const newEvento = new Evento();
        newEvento.title = title;
        newEvento.notes = notes;
        console.log(newEvento)

        newEvento.save((err) => {
        if(err){
            console.log(err);
            return res.send({
                success: false,
                message: 'Error: Server error'
            });
        }
        return res.send({                            
            success: true,
            message: 'Evento Creado.. ',   
            ok: true,
            });
        });
    });
};
