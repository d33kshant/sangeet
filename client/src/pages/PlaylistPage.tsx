import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Playlist from "../types/Playlist"
import SongList from "../components/SongList"
import { Paper, Stack, Typography } from "@mui/material"

export default function PlaylistPage() {

	const { id: playlistId } = useParams()
	const [playlist, setPlaylist] = useState<Playlist | null>(null)

	useEffect(() => {
		const fetchPlaylist = async () => {
			const response = await fetch(`http://localhost:5000/playlist/${playlistId}`)
			const data: Playlist = await response.json()
			setPlaylist(data)
		}
		fetchPlaylist()
	}, [playlistId])

	return (
		<>
			<Paper square>
				<Stack direction="row" padding={4} gap={4}>
					<img width={200} height={200} src={playlist?.album_art} alt={playlist?.description} />
					<Stack gap={1}>
						<Typography variant="h2">
							{playlist?.title}
						</Typography>
						<Typography color="GrayText" variant="body2">
							{playlist?.songs.length} songs • {playlist?.description || "No description"}
						</Typography>
					</Stack>
				</Stack>
			</Paper>
			{playlist?.songs ? <SongList songs={playlist?.songs} /> : "Wait"}
		</>
	)
}