import useAuth from "./useAuth";
import useProyectos from "./useProyectos";

const useAdmin = () => {
  const { proyecto } = useProyectos()
  const { auth } = useAuth()
  return proyecto.creador === auth._id  // si es true quiere decir que es el admin 
}

export default useAdmin