import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import PlaylistPage from './pages/PlaylistPage.tsx'
import HomePage from './pages/HomePage.tsx'
import './index.css'

function withApp(elem: any) {
	return (
		<App>
			{elem}
		</App>
	)
}

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />
	},
	{
		path: "/playlist/:id",
		element: <PlaylistPage />
	}
].map(page => ({ ...page, element: withApp(page.element) })))

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
)
