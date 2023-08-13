import { Dispatch, createContext, useReducer } from "react"
import Song from "./types/Song"

export enum ActionType {
	REG_PLAY_FUNC,
	SET_SONG_QUEUE,
	NEXT_IN_QUEUE,
	PREV_IN_QUEUE,
	PLAY_FROM_QUEUE,
	SET_QUEUE_AND_PLAY,
}

interface AppState {
	currentSong: Song | null,
	current: number,
	queue: Song[],
	playlistId: string | null,
	play: ((id: string) => void) | undefined
}

interface Action {
	type: ActionType,
	payload: any
}

interface AppContextType {
	state: AppState,
	dispatch: Dispatch<Action>
}

const INITIAL_APP_STATE: AppState = {
	currentSong: null,
	current: -1,
	queue: [],
	playlistId: null,
	play: undefined
}

function AppStateReducer(state: AppState, action: Action): AppState {
	switch (action.type) {
		case ActionType.REG_PLAY_FUNC: {
			// payload: (string) => void
			return { ...state, play: action.payload }
		}
		case ActionType.SET_SONG_QUEUE: {
			if (action.payload && action.payload.length == 0)
				return state
			return {
				...state,
				queue: action.payload,
			}
		}
		case ActionType.NEXT_IN_QUEUE: {
			const newState = { ...state }
			if (newState.queue.length === 0 || state.current === -1) {
				return state
			}
			const next = (newState.current = (newState.current + 1) % newState.queue.length)
			newState.currentSong = newState.queue[next]
			newState.play && newState.play(newState.currentSong._id)
			return newState
		}
		case ActionType.PREV_IN_QUEUE: {
			const newState = { ...state }
			if (newState.queue.length === 0 || state.current === -1) {
				return state
			}
			const prev = (newState.current = (newState.current + (newState.queue.length - 1)) % newState.queue.length)
			newState.currentSong = newState.queue[prev]
			newState.play && newState.play(newState.currentSong._id)
			return newState
		}
		case ActionType.PLAY_FROM_QUEUE: {
			const newState = { ...state }
			const current = action.payload
			newState.current = current
			newState.currentSong = newState.queue[current]
			newState.play && newState.play(newState.currentSong._id)
			return newState
		}
		case ActionType.SET_QUEUE_AND_PLAY: {
			const newState = { ...state }
			const { songs, playlistId, start } = action.payload
			newState.queue = songs
			newState.playlistId = playlistId
			newState.current = start || 0
			newState.currentSong = newState.queue[newState.current]
			return newState
		}
		default: return state
	}
}


export const AppStateContext = createContext<AppContextType>({
	state: INITIAL_APP_STATE,
	dispatch: () => { },
})

export default function AppStateProvider({ children }: any) {
	const [state, dispatch] = useReducer(AppStateReducer, INITIAL_APP_STATE)
	return (
		<AppStateContext.Provider value={{ state, dispatch }}>
			{children}
		</AppStateContext.Provider>
	)
}