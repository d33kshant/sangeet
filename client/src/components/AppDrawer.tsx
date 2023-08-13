import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material"
import { Home as HomeIcon, LibraryMusic } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"

export default function AppDrawer() {
	const navigate = useNavigate()
	return (
		<>
			<Box sx={{ width: 240, height: "100%" }}>
				<Toolbar variant="dense" />
				<List>
					{/* <ListItem disablePadding>
						<ListItemButton onClick={() => navigate("/")}>
							<ListItemIcon>
								<HomeIcon />
							</ListItemIcon>
							<ListItemText primary="Home" />
						</ListItemButton>
					</ListItem> */}
					<ListItem disablePadding>
						<ListItemButton onClick={() => navigate("/")}>
							<ListItemIcon>
								<LibraryMusic />
							</ListItemIcon>
							<ListItemText primary="Playlists" />
						</ListItemButton>
					</ListItem>
				</List>
				<Divider />
			</Box>
			<Divider orientation="vertical" />
		</>
	)
}