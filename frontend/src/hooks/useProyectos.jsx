import { useContext } from "react";
import ProyectosContext from "../context/ProyectosProvider.jsx";

const useProyectos = () => {
	return useContext(ProyectosContext);
};

export default useProyectos;