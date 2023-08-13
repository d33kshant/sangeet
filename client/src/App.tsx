import { useMemo, useState } from "react";
import AppStateProvider from "./AppStateProvider"
import AppDrawer from "./components/AppDrawer"
import AudioPlayer from "./components/AudioPlayer"
import { ThemeProvider, createTheme, Stack, Box, CssBaseline, Toolbar, GlobalStyles } from "@mui/material"
import ThemeContext from "./contexts/ThemeContext";
import AppBar from "./components/AppBar";

function App({ children }: any) {
	const [mode, setMode] = useState<"light" | "dark">("light")
	const colorMode = useMemo(() => ({
		theme: mode,
		toggleTheme: () => {
			setMode(prev => prev === "light" ? "dark" : "light")
		}
	}), [])
	const theme = useMemo(() => createTheme({ palette: { mode } }), [mode])

	return (
		<ThemeContext.Provider value={colorMode}>
			<GlobalStyles styles={{ ":root": { "color-scheme": mode } }} />
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<AppStateProvider>
					<Stack height="100%">
						<AppBar />
						<Stack direction="row" flex={1}>
							<AppDrawer />
							<Box flex={1} overflow="auto" flexDirection="column" sx={{ height: "calc(100vh - 54.5px)" }}>
								<Toolbar variant="dense" />
								{children}
							</Box>
						</Stack>
						<AudioPlayer />
					</Stack>
				</AppStateProvider>
			</ThemeProvider>
		</ThemeContext.Provider>
	)
}

export default App
