import { UiState } from './';

type UiActionType =
  | { type: '[UI] - ToggleSidemenu' }

export const uiReducer = (state: UiState, action: UiActionType): UiState => {

  switch (action.type) {
    case '[UI] - ToggleSidemenu':
      return {
        ...state,
        isMenuOpen: !state.isMenuOpen
      }

    default:
      return state

  }
}