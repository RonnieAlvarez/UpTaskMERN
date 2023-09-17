/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/clienteAxios';

const Registrar = () => {
	const [nombre, setNombre] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repetirPassword, setRepetirPassword] = useState('');
	const [alerta, setAlerta] = useState({});
	const url = import.meta.env.VITE_BACKEND_URL
	
	const handleSubmit = async (e) => {
		e.preventDefault();
		if ([nombre, email, password, repetirPassword].includes('')) {
			setAlerta({
				msg: 'Todos los campos son obligatorios',
				error: true,
			});
			return;
		}
		if (password !== repetirPassword) {
			setAlerta({
				msg: 'Los password no son iguales',
				error: true,
			});
			return;
		}
		if (password.length < 6) {
			setAlerta({
				msg: 'El password es muy corto, minimo 6 caracteres',
				error: true,
			});
			return;
		}
		setAlerta({});
		//creando el usuario en la API en el Backend
		try {
			const { data } = await clienteAxios.post(`/usuarios`, { nombre, email, password });
			setAlerta({
				msg: data.msg,
				error: false,
			});
			setNombre('')
			setEmail('')
			setPassword('');
			setRepetirPassword('')

		} catch (error) {
			setAlerta({
				msg: error.response.data.msg,
				error: true,
			});
		}
	};
	const { msg } = alerta;
	return (
		<>
			<div className='flex justify-center'>
				<h1 className='text-sky-600 font-black text-4xl capitalize'>
					Crea tu cuenta y administra tus
					<span className='text-slate-700'> proyectos</span>
				</h1>
			</div>
			{msg && <Alerta alerta={alerta} />}
			<form
				className='my-10 bg-white shadow rounded-lg p-10'
				onSubmit={handleSubmit}
			>
				<div className='my-5 '>
					<label
						className='uppercase text-gray-600 block text-xl font-bold'
						htmlFor='nombre'
					>
						Nombre
					</label>
					<input
						type='text'
						id='nombre'
						placeholder='Tu Nombre'
						className='w-full mt-3 p-3 border rounded-xl bg-gray-50 shadow-radius'
						value={nombre}
						onChange={(e) => setNombre(e.target.value)}
					/>
				</div>
				<div className='my-5 '>
					<label
						className='uppercase text-gray-600 block text-xl font-bold'
						htmlFor='email'
					>
						Email
					</label>
					<input
						type='email'
						id='email'
						placeholder='Email de Registro'
						className='w-full mt-3 p-3 border rounded-xl bg-gray-50 shadow-radius'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className='my-5 '>
					<label
						className='uppercase text-gray-600 block text-xl font-bold'
						htmlFor='password'
					>
						Password
					</label>
					<input
						type='password'
						id='password'
						placeholder='Password de Registro'
						className='w-full mt-3 p-3 border rounded-xl bg-gray-50 shadow-radius'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div className='my-5 '>
					<label
						className='uppercase text-gray-600 block text-xl font-bold'
						htmlFor='password2'
					>
						Repetir Password
					</label>
					<input
						type='password'
						id='password2'
						placeholder='Repetir Password'
						className='w-full mt-3 p-3 border rounded-xl bg-gray-50 shadow-radius'
						value={repetirPassword}
						onChange={(e) => setRepetirPassword(e.target.value)}
					/>
				</div>

				<input
					type='submit'
					className='bg-sky-700 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer
          hover:bg-sky-800 transition-colors mb-5'
					value='Crear Cuenta'
				/>
			</form>
			<nav className='lg:flex lg:justify-between'>
				<Link
					className='block text-center my-5 text-slate-500 uppercase text-sm'
					to='/'
				>
					¿Ya tienes una cuenta? Inicia Sesión
				</Link>
				<Link
					className='block text-center my-5 text-slate-500 uppercase text-sm'
					to='/olvide-password'
				>
					Olvide mi Password
				</Link>
			</nav>
		</>
	);
};

export default Registrar;
