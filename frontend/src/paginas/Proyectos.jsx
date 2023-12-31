import useProyectos from '../hooks/useProyectos.jsx';
import PreviewProyecto from '../components/PreviewProyecto.jsx';
import Alerta from '../components/Alerta.jsx';

const Proyectos = () => {
	const { proyectos, alerta } = useProyectos();
	
	
	const { msg } = alerta
	return (
		<>
			<h1 className='text-4xl font-black'>Proyectos</h1>
			{msg && <Alerta alerta={alerta} />}
			<div className='bg-white shadow mt-10 rounded-lg'>
				{proyectos.length ? 
					proyectos.map(proyecto => (
						<PreviewProyecto
							key={proyecto._id}
							proyecto={proyecto}
						/>
          ))
				: 
					<p className=' text-center text-gray-600 uppercase'>No hay proyectos creados</p>
				}
			</div>
		</>
	);
};

export default Proyectos;
