/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import useProyectos from '../hooks/useProyectos';
import ModalFormularioTarea from '../components/ModalFormularioTarea.jsx';
import ModalEliminarTarea from '../components/ModalEliminarTarea';
import Tarea from '../components/Tarea';
import Alerta from '../components/alerta';

const Proyecto = () => {
	const params = useParams();
	const { obtenerProyecto, proyecto, cargando, handleModalTarea, alerta } = useProyectos();

	useEffect(() => {
		obtenerProyecto(params.id);
	}, []);

	const { nombre } = proyecto;
	if (cargando) return 'Cargando...';

	const { msg } = alerta;

	return (
		<>
			<div className='flex justify-between'>
				<h2 className='font-black text-4xl'>{nombre}</h2>
				<div className='flex items-center gap-2 text-gray-600 hover:text-black'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						strokeWidth={1.5}
						stroke='currentColor'
						className='w-6 h-6'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
						/>
					</svg>
					<Link
						className='uppercase font-bold text-lg items-center'
						to={`/proyectos/editar/${params.id}`}
					>
						Editar
					</Link>
				</div>
			</div>

			<button
				onClick={handleModalTarea}
				type='button'
				className='text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold
				bg-sky-400 text-white text-center mt-5 flex gap-2 items-center justify-center'
			>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					viewBox='0 0 24 24'
					fill='currentColor'
					className='w-6 h-6'
				>
					<path
						fillRule='evenodd'
						d='M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z'
						clipRule='evenodd'
					/>
				</svg>
				Nueva Tarea
			</button>
			<p className='font-bold text-xl mt-10'>Tareas del Proyecto</p>

			<div className='flex justify-start'>
				<div className='w-full md:w-1/3 lg:w-1/4'>{msg && <Alerta alerta={alerta} />}</div>
			</div>
			<div className='flex-1 overflow-y-scroll'>
				<div className='bg-white shadow  rounded-lg'>
					{proyecto.tareas?.length ? (
						proyecto.tareas?.map((tarea) => (
							<Tarea
								key={tarea.id}
								tarea={tarea}
							/>
						))
					) : (
						<p className='text-center my-5 p-10'>No hay tareas en este Proyecto</p>
					)}
				</div>
			</div>
			<ModalFormularioTarea />
			<ModalEliminarTarea />
		</>
	);
};

export default Proyecto;
