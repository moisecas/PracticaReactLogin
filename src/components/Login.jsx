import React from 'react'
import {auth, db} from '../firebase' //importamos el auth de firebase.js
import {withRouter} from 'react-router-dom' //nos permite enviar al usuario a diferentes rutas 

const Login = () => { //creamos useState para validar los campos del usuario 

    const [email, setEmail] = React.useState('')
    const [pass, setPass] = React.useState('')
    const [error, setError] = React.useState(null) //para pintar los errores 
    const [esRegistro, setEsRegistro]= React.useState(true) //esta en true porque por defecto será nuestro formulario de registro de usuarios

    const procesarDatos = e => { //recibe un evento
        e.preventDefault() //para que no haga el metodo get 
        if(!email.trim() || !pass.trim()){ //lo contrario de email nos va a ejecutar, para campos vacios 
            console.log('Datos vacíos email!')
            setError('Datos vacíos email!')
            return //return para que se salga de la función 
        }
        if(!pass.trim()){ //hacemos lo mismo para la contraseña 
            console.log('Datos vacíos pass!')
            setError('Datos vacíos pass!')
            return
        }
        if(pass.length < 6){ //para validar la cantidad de caracteres mínimos que debe llevar la contraseña 
            console.log('6 o más carácteres')
            setError('6 o más carácteres en contraseña')
            return
        }
        console.log('correcto...')
        setError(null) //en null para poder mostrar en el sitio web 

        if(esRegistro){ //si es verdadero, le pasamos una función
            registrar() 
        }else{
            login()
        }


    }
    //variables afuera de procesar datos
    const login = React.useCallback(async()=>{
        try {
           const res = await auth.signInWithEmailAndPassword(email,pass) //res respuesta a que el usuario este logueado
           console.log(res.user) 

           setEmail('')
           setPass('')
           setError(null)

        } catch (error) {
            console.log(error)
            setError('error')
        }
    },[email,pass])

    const registrar = React.useCallback(async()=>{ //nos sirve para generar un cb, como función de flecha

        try{ //pintar o mostar errores
            const res = await auth.createUserWithEmailAndPassword(email,pass) //función traida de la documentación de firebase, le damos los parametros necesarios para la creación del usuario o cuenta 
            
            console.log(res.user) //mostrar esa rta  
            await db.collection('usuarios').doc(res.user.email).set({ //creamos colecicon (tabla) usuarios, se puede ver en firebase
                email: res.user.email, //email del usuario 
                uid: res.user.uid //mas su información, el uid se pude ver en firebase, autenticacion del proyecto creado
            }) //para relacionar las cuentas creadas con una base de datos   
            
            //reiniciar los state
            setEmail('')
            setPass('')
            setError(null)

        }catch (error){
            console.log(error)
            setError('error')//para mostrar el error por pantalla  
        }

    },[email,pass]) //llamamos a los state que estemos usando 

    return (
        <div className="mt-5">
            <h3 className="text-center">
                {
                    esRegistro ? 'Registro de usuarios' : 'Login de acceso'
                 }
            </h3>
            <hr/>
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <form onSubmit={procesarDatos}>
                        {
                            error ? (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            ) : null
                        }
                        <input 
                            type="email" 
                            className="form-control mb-2"
                            placeholder="Ingrese Email"
                            onChange={ e => setEmail(e.target.value) }
                            value={email}
                        />
                        <input 
                            type="password" 
                            className="form-control mb-2"
                            placeholder="Ingrese Contraseña"
                            onChange={ e => setPass(e.target.value) }
                            value={pass}
                        />
                        <button 
                            className="btn btn-lg btn-dark btn-block"
                            type="submit"
                        >
                            {
                                esRegistro ? 'Registrarse' : 'Acceder'
                            }
                        </button>
                        <button 
                            className="btn btn-sm btn-info btn-block"
                            type="button"
                            onClick={()=> setEsRegistro(!esRegistro)} //recibe una arrow, una vez que se presione va a pasar a lo contrario
                        >
                            {
                                esRegistro ? '¿Ya tienes cuenta?' : '¿no tienes cuenta?' 
                            }
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter (Login)//nos va a generar props, en la const Login los vamos a colocar   