import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth.jsx';
import Sidebar from '../components/Sidebar.jsx';
import Header from '../components/Header.jsx';

const RutaProtegida = () => {
	const { auth, cargando } = useAuth();
	if (cargando) return 'cargando...';
	return (
		<>
			{auth._id ? (
				<div className='bg-gray-100 '>
					<div className='sticky top-0 z-50 shadow'>
						<Header />
					</div>
					<div className='md:flex md:min-h-screen'>
						<Sidebar />

						<main className='p-10 flex-1 '>
							{/* h-screen overflow-y-scroll */}
							{' '}
							<Outlet />
						</main>
					</div>
				</div>
			) : (
				<Navigate to='/' />
			)}
		</>
	);
};

export default RutaProtegida;
