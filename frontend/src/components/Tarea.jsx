/* eslint-disable react/prop-types */
import { formatearFecha } from "../helpers/formatearFecha";
import useProyectos from "../hooks/useProyectos";


const Tarea = ({ tarea }) => {
  const {handleModalEditarTarea, handleModalEliminarTarea} = useProyectos();
	const { descripcion, nombre, prioridad, fechaEntrega, _id, estado } = tarea;
	return (
		<div className='border-b-4 border-gray-600 p-5 flex justify-between items-center'>
			<div>
				<p className='mb-1text-xl font-bold'>{nombre}</p>
				<p className='mb-1text-sm text-gray-500 uppercase'>{descripcion}</p>
				<p className='mb-1text-sm'>{formatearFecha(fechaEntrega)}</p>
				<p className='mb-1text-gray-600'>Prioridad: {prioridad}</p>
			</div>
			<div className='flex gap-2'>
				<button
					className='bg-amber-700 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg'
					onClick={() => handleModalEditarTarea(tarea)}
				>
					Editar
				</button>
				{estado ? (
					<button className='bg-sky-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg'>
						Completa</button>
				) : (
					<button className='bg-gray-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg'>
						Incompleta
					</button>
				)}
				<button
					className='bg-red-600 px-4 py-3 text-white uppercase font-bold text-sm rounded-lg'
					onClick={()=>handleModalEliminarTarea(tarea)}
				>
					Eliminar
				</button>
			</div>
		</div>
	);
};

export default Tarea;
