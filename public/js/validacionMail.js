let campoEmail = document.querySelector("#mail");

function validarMail(campoEmail){
    
    let erroresMail = [];
    let expReg= /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    let esValido = expReg.test(campoEmail); 

    if (esValido == false) {
        alert("Tu correo electrónico no es válido");
        erroresMail.push("Tu correo electrónico no es válido");
        
    }

    if (erroresMail.length > 0) {
        let ulErrores = document.querySelector(".erroresMail");
    
        for (let i = 0; i < erroresMail.length; i++){
    
            ulErrores.innerHTML += "    " + erroresMail[i] + "    "
        }
    }

}
