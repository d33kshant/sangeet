import { useContext, useEffect } from "react"
import { ActionType, AppStateContext } from "../AppStateProvider"
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import moment from "moment"
import Song from "../types/Song"

interface Props {
	songs: { song: Song, time_added: string }[],
}

export default function SongList({ songs }: Props) {

	const { state: { currentSong }, dispatch } = useContext(AppStateContext)

	useEffect(() => {
		dispatch({ type: ActionType.SET_SONG_QUEUE, payload: songs.map(s => s.song) })
	}, [])


	return (
		<TableContainer square elevation={0} component={Paper}>
			<Table>
				<TableHead>
					<TableRow sx={{ cursor: "default" }}>
						<TableCell sx={{ borderBottom: "none", paddingLeft: 4 }}>#</TableCell>
						<TableCell sx={{ borderBottom: "none" }}>Title</TableCell>
						<TableCell sx={{ borderBottom: "none" }}>Time Added</TableCell>
						<TableCell sx={{ borderBottom: "none" }}>Duration</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{songs.map(({ song, time_added }, i) => (
						<TableRow
							hover
							key={i}
							selected={song?._id === currentSong?._id}
							onClick={() => { dispatch({ type: ActionType.PLAY_FROM_QUEUE, payload: i }) }}
							sx={{ cursor: "pointer" }}
						>
							<TableCell sx={{ borderBottom: "none", paddingLeft: 4 }}>{i + 1}</TableCell>
							<TableCell sx={{ borderBottom: "none" }}>{song?.title}</TableCell>
							<TableCell sx={{ borderBottom: "none" }}>{moment(time_added).fromNow()}</TableCell>
							<TableCell sx={{ borderBottom: "none" }}>{song?.duration}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}