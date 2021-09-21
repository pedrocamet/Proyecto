const fs = require('fs');
const path = require('path');
const multer = require ('multer');
const { DefaultDeserializer } = require('v8');
const bcryptjs = require ('bcryptjs');
const {validationResult} = require("express-validator");
const {body} = require ("express-validator");


//BASE DE DATOS
const db = require("../../database/models")
const Op = db.Sequelize.Op; // o const {Op} = require("sequelize");

const usuariosFilePath = path.join(__dirname, '../data/usuarios.json');
const usuarios = JSON.parse(fs.readFileSync(usuariosFilePath, 'utf-8'));
let usuarioAModificar ;

const userControlador = 
{
  creacionUsuario: (req, res) => {
    res.render ("./users/registro.ejs");
  },

  // login y cruce de datos

  loginUsuario: (req, res) => {
    res.render ("login");
  },
  
  procesarLogin: (req, res) => {

 
     let errors = validationResult(req);
    
     let usuarioALoguearse;
 
     if (errors.isEmpty()){

       for (let i = 0; i < usuarios.length; i++) {
         if ((usuarios[i].email == req.body.email) && (bcryptjs.compareSync(req.body.password, usuarios[i].password))) {
            usuarioALoguearse = usuarios[i];
           break;
         }}
       } []
       if (usuarioALoguearse == undefined) {
         return res.render("login", {errors: [
           {msg: "Credenciales invalidas"}
         ]});
       }
       
       
       req.session.usuarioLogueado = usuarioALoguearse;
       usuarioAModificar = req.session.usuarioLogueado;
       
       
       let usuarioAModificar = req.session.usuarioLogueado;
       console.log(usuarioAModificar)
       res.render("users/datosPersonales",{usuarioAEditar: usuarioAModificar});
     },

  // fin login y cruce de datos

  procesarRegistro: (req,res) => {

    const resultValidation = validationResult(req);
    const lastUser = usuarios.length;
  
    if(resultValidation.isEmpty()){

      let userToCreate = {
        id: lastUser,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        password: bcryptjs.hashSync(req.body.password, 10),
        fotoPerfil: req.file.filename
      }

      
      usuarios.push(userToCreate);
      fs.writeFileSync(usuariosFilePath, JSON.stringify(usuarios, null, " "))
      return res.redirect ("/");



    }

    
   /* if(resultValidation.errors.length > 0){
        return res.render("./users/registro", {
        errors: resultValidation.mapped(),
        oldData: req.body
    });  
}
    
*/
},
 datosPersonales:(req,res) => {

  let productoEncontrado;      
  db.Clientes.findByPk(req.params.id).then(function(productoEncontrado) {
  res.render("./users/datosUsuarios.ejs",{productoDetalle: productoEncontrado});
  })     
  .catch(function(e){
  res.send(e)
  })
  console.log( "producto 2 =" + productoEncontrado)

    



  },

  updateUser: (req,res) => {
    console.log(usuarioAModificar)
      let idUser = usuarioAModificar.id;
      let userToEdit;
      console.log(idUser)
      let imagenPerfilABorrar;
  for (let u of usuarios){
    if(idUser==u.id){                 
      u.nombre= req.body.nombre,
      u.apellido= req.body.apellido,
      u.email= req.body.email
      let validacion;
      console.log(u.password)
      if (validacion = bcryptjs.compareSync(req.body.passwordAnterior, u.password)){
      u.password= bcryptjs.hashSync(req.body.passwordNueva,10)  
        if(req.file != undefined){
                  imagenPerfilABorrar= u.fotoPerfil;
                  u.fotoPerfil=req.file.filename
                  fs.unlinkSync(path.join(__dirname, '../../public/img/', imagePerfilABorrar));
              } else {
                  u.fotoPerfil=u.fotoPerfil                 
              }}
              break;
          }}    

      fs.writeFileSync(usuariosFilePath, JSON.stringify(usuarios, null, " ")),
      console.log(imagenPerfilABorrar)
      
                 
      res.redirect('/');  
      
  },  

/*
  registrarse: function(req, res, next){
    console.log (req);
    
    let usuario = {
      nombreDeUsuario = req.body.username,
      email = req.body.email,
      contrasena= bcrypt.hashSync(req.body.password, 10),
      
    }
  }
  */
}

module.exports = userControlador;