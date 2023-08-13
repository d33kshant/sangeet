import { AppBar as AB, Box, IconButton, Stack, ToggleButton, Toolbar, Typography } from "@mui/material";
import { useContext } from "react";
import ThemeContext from "../contexts/ThemeContext";
import { DarkMode } from "@mui/icons-material";

export default function AppBar() {
	const { theme, toggleTheme } = useContext(ThemeContext)
	return (
		<AB elevation={1}>
			<Toolbar variant="dense">
				<Stack width="100%" flexDirection="row" justifyContent="space-between" alignItems="center">
					<Typography variant="subtitle1">Sangeet</Typography>
					<IconButton
						value="check"
						// selected={theme !== "light"}
						onClick={() => {
							toggleTheme()
						}}
					>
						<DarkMode />
					</IconButton>
				</Stack>
			</Toolbar>
		</AB>
	)
}