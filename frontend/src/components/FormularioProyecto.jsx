/* eslint-disable react-hooks/exhaustive-deps */
import { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useProyectos from '../hooks/useProyectos';
import Alerta from './alerta';

const FormularioProyecto = () => {
	const [id,setId]= useState('')
	const [nombre, setNombre] = useState('');
	const [descripcion, setDescripcion] = useState('');
	const [fechaEntrega, setFechaEntrega] = useState('');
	const [cliente, setCliente] = useState('');

	const params = useParams()

	const { mostrarAlerta, alerta, submitProyecto,proyecto } = useProyectos();

	useEffect(() => { 
		if (params.id) {
			setId(proyecto._id)
			setNombre(proyecto.nombre)
			setDescripcion(proyecto.descripcion) 
			setFechaEntrega(proyecto.fechaEntrega?.split('T')[0])
			setCliente(proyecto.cliente);
		}
	}, [params])

	const handleSubmit = async (e) => {
		e.preventDefault();
		if ([nombre, descripcion, fechaEntrega, setFechaEntrega, cliente].includes('')) {
			mostrarAlerta({
				msg: 'Todos los Campos son Obligatorios',
				error: true,
			})
			return
		}
		//pasar los datos hacia el provider
		await submitProyecto({id, nombre, descripcion, fechaEntrega, cliente });
		setId(''),
			setNombre(''), setDescripcion(''), setFechaEntrega(''), setCliente('');

	};
	const { msg } = alerta;
	return (
		<form
			onSubmit={handleSubmit}
			className='bg-white py-10 px-5 md:w-1/2 rounded-lg shadow'
		>
			{msg && <Alerta alerta={alerta} />}
			<div className='mb-5'>
				<label
					htmlFor='nombre'
					className='text-gray-700 uppercase font-bold text-sm'
				>
					Nombre Proyecto
				</label>
				<input
					type='text'
					placeholder='Nombre del proyecto'
					className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
					id='nombre'
					value={nombre}
					onChange={(e) => setNombre(e.target.value)}
				/>
			</div>

			<div className='mb-5'>
				<label
					htmlFor='descripcion'
					className='text-gray-700 uppercase font-bold text-sm'
				>
					Descripcion
				</label>
				<textarea
					placeholder='Descripción del proyecto'
					className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
					id='descripcion'
					value={descripcion}
					onChange={(e) => setDescripcion(e.target.value)}
				/>
			</div>

			<div className='mb-5'>
				<label
					htmlFor='fecha-entrega'
					className='text-gray-700 uppercase font-bold text-sm'
				>
					Fecha entrega
				</label>
				<input
					type='date'
					className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
					id='fecha-entrega'
					value={fechaEntrega}
					onChange={(e) => setFechaEntrega(e.target.value)}
				/>
			</div>

			<div className='mb-5'>
				<label
					htmlFor='nombre-cliente'
					className='text-gray-700 uppercase font-bold text-sm'
				>
					Nombre del Cliente
				</label>
				<input
					type='text'
					placeholder='Nombre del Cliente'
					className='border w-full p-2 mt-2 placeholder-gray-400 rounded-md'
					id='nombre-cliente'
					value={cliente}
					onChange={(e) => setCliente(e.target.value)}
				/>
			</div>
			<input
				type='submit'
				value={id ? "Actualizar Proyecto": "Crear Proyecto"}
				className='bg-sky-600 w-full p-3 uppercase font-bold text-white rounded-lg
				cursor-pointer hover:bg-sky-700 transition-colors'
			/>
		</form>
	);
};

export default FormularioProyecto;
