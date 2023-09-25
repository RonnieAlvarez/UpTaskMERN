import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AuthLayout from './layouts/AuthLayout.jsx';
import RutaProtegida from './layouts/RutaProtegida.jsx';

import Login from './paginas/Login.jsx';
import Registrar from './paginas/Registrar.jsx';
import OlvidePassword from './paginas/OlvidePassword.jsx';
import NuevoPassword from './paginas/NuevoPassword.jsx';
import ConfirmarCuenta from './paginas/ConfirmarCuenta.jsx';
import Proyectos from './paginas/Proyectos.jsx';
import NuevoProyecto from './paginas/NuevoProyecto.jsx';
import Proyecto from './paginas/Proyecto.jsx';
import EditarProyecto from './paginas/EditarProyecto.jsx';
import NuevoColaborador from './paginas/NuevoColaborador.jsx';

import { AuthProvider } from './context/AuthProvider.jsx';
import { ProyectosProvider } from './context/ProyectosProvider.jsx';

function App() {
	return (
		<BrowserRouter>
			<AuthProvider>
				<ProyectosProvider>
					<Routes>
						<Route
							path='/'
							element={<AuthLayout />}
						>
							<Route
								index
								element={<Login />}
							/>
							<Route
								path='registrar'
								element={<Registrar />}
							/>
							<Route
								path='olvide-password'
								element={<OlvidePassword />}
							/>
							<Route
								path='olvide-password/:token'
								element={<NuevoPassword />}
							/>
							<Route
								path='confirmar/:id'
								element={<ConfirmarCuenta />}
							/>
						</Route>

						<Route
							path='/proyectos'
							element={<RutaProtegida />}
						>
							<Route
								index
								element={<Proyectos />}
							/>
							<Route
								path='crear-proyecto'
								element={<NuevoProyecto />}
							/>
							<Route
								path='nuevo-colaborador/:id'
								element={<NuevoColaborador />}
							/>
							<Route
								path=':id'
								element={<Proyecto />}
							/>
							<Route
								path='editar/:id'
								element={<EditarProyecto />}
							/>
						</Route>
					</Routes>
				</ProyectosProvider>
			</AuthProvider>
		</BrowserRouter>
	);
}

export default App;
