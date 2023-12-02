import { createDraftSafeSelector as createSelector, createSlice } from '@reduxjs/toolkit';
import { CategoryProps } from 'shared/types/Category';
import { RootState } from 'app/store';

interface CcategoryInitialState {
  categories: Array<CategoryProps>;
}

export const initialState: CcategoryInitialState = {
  categories: []
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    update: (state, action) => {
      state = { ...state, ...action.payload };
    },
    reset: () => {
      return initialState;
    }
  }
});

// Action creators are generated for each case reducer function
export const categoryActions = categorySlice.actions;

export default categorySlice.reducer;

// ------------------------------------------------------------ //
// ------------------------ Selectors ------------------------- //
// ------------------------------------------------------------ //
const _categories = (state: RootState) => state.data.categories;

export const getCategories = createSelector(_categories, (data) => data);