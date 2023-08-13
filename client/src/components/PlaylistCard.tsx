import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Props {
	_id: string,
	title: string,
	description: string,
	album_art: string,
	songs: number,
}

export default function PlaylistCard({ _id, title, description, album_art, songs }: Props) {

	const navigate = useNavigate()

	return (
		<Grid onClick={() => navigate(`/playlist/${_id}`)} item>
			<Card>
				<CardActionArea>
					<CardMedia
						component="img"
						height="200"
						image={album_art}
						alt={description}
					/>
					<CardContent>
						<Typography gutterBottom variant="h5" component="div">
							{title}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							{description}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							{songs} songs
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
		</Grid>
	)
}