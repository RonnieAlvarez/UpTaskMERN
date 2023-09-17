import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
	return (
		<>
			<div className='container min-w-full overflow-y-hidden'>
				<main className='ms-auto mt-5 md:mt-20 p-5 md:flex md:justify-center '>
					<div className='md:w-2/3 lg:w-2/5 '>
						<Outlet />
					</div>
				</main>
			</div>
		</>
	);
};

export default AuthLayout;
