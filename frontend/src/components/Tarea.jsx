/* eslint-disable react/prop-types */
import { formatearFecha } from '../helpers/formatearFecha';
import useProyectos from '../hooks/useProyectos';
import useAdmin from '../hooks/useAdmin';

const Tarea = ({ tarea }) => {
	const { handleModalEditarTarea, handleModalEliminarTarea, completarTarea } = useProyectos();
	const { descripcion, nombre, prioridad, fechaEntrega, estado,_id } = tarea;
	const admin = useAdmin();

	return (
		<div
			className='border-b-2 shadow-md border-gray-600 p-5 bg-white mb-5
		 flex justify-between items-center rounded-lg'
		>
			<div className='flex flex-col items-start'>
				<p className='mb-1text-xl font-bold'>{nombre} </p>
				<p className='mb-1text-sm text-gray-500 uppercase'>{descripcion}</p>
				<p className='mb-1text-sm'>{formatearFecha(fechaEntrega)}</p>
				<p className='mb-1text-gray-600'>Prioridad: {prioridad}</p>
				{estado && <p className='text-xs bg-green-600 uppercase p-1
				rounded-lg text-white'>Completado por: {tarea.completado.nombre}</p>}
			</div>
			<div className='flex flex-col lg:flex-row gap-2'>
				{admin && (
					<button
						className='bg-amber-700 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg'
						onClick={() => handleModalEditarTarea(tarea)}
					>
						Editar
					</button>
				)}
				
				<button onClick={() => completarTarea(_id)}
					className={`${estado ? 'bg-sky-600' : 'bg-gray-600'} px-4 py-3 text-white uppercase font-bold text-sm rounded-lg`}>
					{estado ? 'Completa' : 'Incompleta'}
					</button>
				
				{admin && (
					<button
						className='bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg'
						onClick={() => handleModalEliminarTarea(tarea)}
					>
						Eliminar
					</button>
				)}
			</div>
		</div>
	);
};

export default Tarea;
