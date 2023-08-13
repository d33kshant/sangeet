import { useContext, useEffect, useRef, useState } from "react"
import { ActionType, AppStateContext } from "../AppStateProvider"
import { Paper, Box, IconButton, Divider, Typography } from "@mui/material"
import { SkipNext, SkipPrevious, PlayArrow, Pause } from '@mui/icons-material';

export default function AudioPlayer() {

	const [paused, setPaused] = useState(true)
	const audioRef = useRef<HTMLAudioElement>(null)
	const { state: { queue, current, currentSong }, dispatch } = useContext(AppStateContext)

	const play = (id: string) => {
		audioRef.current?.setAttribute("src", `http://localhost:5000/media/stream?v=${id}&m=audio%2Fmpeg`)
		audioRef.current?.play()
	}

	useEffect(() => {
		dispatch({ type: ActionType.REG_PLAY_FUNC, payload: play })
		setPaused(true)

		return () => {
			setPaused(true)
		}
	}, [])

	const onPlayClicked = () => {
		if (audioRef.current?.paused) {
			audioRef.current.play()
		} else { audioRef.current?.pause() }
		setPaused(audioRef.current?.paused!)
	}

	const onFinishPlaying = () => {
		if (current !== queue.length - 1) {
			dispatch({ type: ActionType.NEXT_IN_QUEUE, payload: null })
		}
	}

	return (
		<Paper square sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
			<Divider />
			<Box sx={{ display: "flex", alignItems: "center" }}>
				<Box sx={{ width: 240, display: "flex", alignItems: "center", gap: 1 }}>
					{currentSong && <img style={{ height: 54, width: 54, objectFit: "cover" }} src={currentSong?.album_art} />}
					<Box alignItems="center">
						<Typography maxWidth="20ch" noWrap variant="subtitle2">{currentSong?.title}</Typography>
						<Typography noWrap variant="caption" color="GrayText">{currentSong?.artist}</Typography>
					</Box>
				</Box>
				<Divider orientation="vertical" />
				<Box sx={{ display: "flex", alignItems: "center", paddingX: "4px", paddingRight: 0, gap: "0" }}>
					<IconButton
						disabled={current === -1 || current <= 0}
						disableRipple
						size="medium"
						onClick={() => { dispatch({ type: ActionType.PREV_IN_QUEUE, payload: null }) }}
					>
						<SkipPrevious fontSize="inherit" />
					</IconButton>
					<IconButton
						disabled={!currentSong}
						onClick={onPlayClicked}
						disableRipple size="medium"
					>
						{paused ? <PlayArrow fontSize="inherit" /> : <Pause fontSize="inherit" />}
					</IconButton>
					<IconButton
						disabled={current === -1 || current >= queue.length - 1}
						disableRipple
						size="medium"
						onClick={() => { dispatch({ type: ActionType.NEXT_IN_QUEUE, payload: null }) }}
					>
						<SkipNext fontSize="inherit" />
					</IconButton>
				</Box>
				<audio
					controls ref={audioRef}
					preload="no"
					style={{ width: "100%", flex: 1 }}
					onPause={() => setPaused(true)}
					onPlay={() => setPaused(false)}
					onEnded={onFinishPlaying}
				>
				</audio>
			</Box>
		</Paper>
	)
}