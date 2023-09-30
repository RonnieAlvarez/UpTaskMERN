/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect, createContext } from 'react';
//import { useNavigate } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true);
  
  //const navigate=useNavigate()

	useEffect(() => {
		const autenticarUsuario = async () => {
			const token = localStorage.getItem('token');
      if (!token) {
        setCargando(false)
				return;
			}

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};
			try {
				// en esta parte si el usuario ya se ah autenticado lo dirige a proyecto sin estar pasando
				// por login cada vez que ingresa a la app
				const { data } = await clienteAxios('/usuarios/perfil', config);
        setAuth(data);
        // navigate('/proyectos')  // si se quita esta linea siempre tiene que estar digitando usuario y password
			} catch (error) {
				setAuth({})
			} 
			setCargando(false);
			
		};
		autenticarUsuario();
	}, []);
	
	const cerrarSessionAuth = () => {
		setAuth({})
	}

	return (
		<AuthContext.Provider
			value={{
				auth,
				setAuth,
				cargando,
				cerrarSessionAuth,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthProvider };

export default AuthContext;
