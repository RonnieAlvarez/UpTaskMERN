import Proyecto from '../models/Proyecto.js';
import Tarea from '../models/Tarea.js';

const agregarTarea = async (req, res) => {
	const { proyecto } = req.body;
	console.log(proyecto)
	const existeProyecto = await Proyecto.findById(proyecto);

	if (!existeProyecto) {
		const error = new Error('El proyecto no Existe');
		return res.status(404).json({ msg: error.message });
	}
	
	if (existeProyecto.creador.toString() !== req.usuario._id.toString()) {
		const error = new Error('El usuario no tiene permisos para añadir');
		return res.status(403).json({ msg: error.message });
	}
	
	try {
		console.log('linea 20 tarea controllers :',req.body)
		const tareaAlmacenada = await Tarea.create(req.body);
		//Almacenar el ID de cada tarea en el proyecto 
	//TODO: esta fallando la creacion de tareas
		existeProyecto.tareas.push(tareaAlmacenada._id);
		await existeProyecto.save()
		res.json(tareaAlmacenada);
	} catch (error) {
		console.error(error);
	}
};

const obtenerTarea = async (req, res) => {
	const { id } = req.params;
	const tarea = await Tarea.findById(id).populate('proyecto');
	if (!tarea) {
		const error = new Error('Tarea no encontrada');
		return res.status(404).json({ msg: error.message });
	}
	if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
		const error = new Error('Acción no válida');
		return res.status(403).json({ msg: error.message });
	}
	res.json(tarea);
};

const actualizarTarea = async (req, res) => {
	const { id } = req.params;
	const tarea = await Tarea.findById(id).populate('proyecto');
	if (!tarea) {
		const error = new Error('Tarea no encontrada');
		return res.status(404).json({ msg: error.message });
	}
	if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
		const error = new Error('Acción no válida');
		return res.status(403).json({ msg: error.message });
	}
	tarea.nombre = req.body.nombre || tarea.nombre;
	tarea.descripcion = req.body.descripcion || tarea.descripcion;
	tarea.prioridad = req.body.prioridad || tarea.prioridad;
	tarea.fechaEntrega = req.body.fechaEntrega || tarea.fechaEntrega;

	try {
		const tareaAlmacendada = await tarea.save();
		res.json(tareaAlmacendada);
	} catch (error) {
		console.log(error);
	}
};

const eliminarTarea = async (req, res) => {
	const { id } = req.params;
	const tarea = await Tarea.findById(id).populate('proyecto');
	if (!tarea) {
		const error = new Error('Tarea no encontrada');
		return res.status(404).json({ msg: error.message });
	}
	if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
		const error = new Error('Acción no válida');
		return res.status(403).json({ msg: error.message });
  }
  try {
    await tarea.deleteOne()
    res.json({msg:"La tarea se Eliminó correctamente"})
  } catch (error) {
    console.log(error.message)
  }
};
const cambiarEstado = async (req, res) => {};

export { agregarTarea, obtenerTarea, actualizarTarea, cambiarEstado, eliminarTarea };
