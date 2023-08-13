import { Box, Grid, Typography } from "@mui/material";
import PlaylistCard from "../components/PlaylistCard";
import { useEffect, useState } from "react";

interface Playlist {
	_id: string,
	title: string,
	description: string,
	songs: number,
	album_art: string
}

export default function HomePage() {

	const [playlists, setPlaylists] = useState<Playlist[]>([])

	useEffect(() => {
		async function fetchPlaylists() {
			const response = await fetch("http://localhost:5000/playlist")
			const data = await response.json()

			if (Array.isArray(data))
				setPlaylists(data)
		}
		fetchPlaylists()
		return () => setPlaylists([])
	}, [])

	return (
		<>
			<Box padding={2}>
				<Typography variant="h4">Playlists</Typography>
			</Box>
			<Grid padding={2} container spacing={1}>
				{playlists.map(playlist => <PlaylistCard {...playlist} />)}
			</Grid>
		</>
	)
}