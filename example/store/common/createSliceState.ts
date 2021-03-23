import { createSlice, ValidateSliceCaseReducers, AsyncThunk, SliceCaseReducers, Slice, Draft, CreateSliceOptions, createAsyncThunk } from '@reduxjs/toolkit';
import toast from './toast';
import loading from './loading';

export type SliceCaseEffects<State> = {
  [K: string]: (state: State, payload?: any) => Promise<State | void | Draft<State>>;
};

export interface CreateSliceOptionsExt<
  State,
  CaseReducers extends SliceCaseReducers<State> = SliceCaseReducers<State>,
  CaseEffects = SliceCaseEffects<State>
  > extends CreateSliceOptions<State, any, any> {
  effects: CaseEffects;
  reducers: ValidateSliceCaseReducers<State, CaseReducers>;
}

export default function createSliceState<State,
  CaseReducers extends SliceCaseReducers<State> = SliceCaseReducers<State>,
  CaseEffects extends SliceCaseEffects<State> = SliceCaseEffects<State>,
  Name extends string = string>
  (options: CreateSliceOptionsExt<State, CaseReducers, CaseEffects>):
  Slice<State, CaseReducers, Name> & {
    actions: { [K in keyof CaseEffects]: (payload: Parameters<CaseEffects[K]>[1]) => void };
    loadings: { [K in keyof CaseEffects]: string };
  } {

  const effects: Partial<{ [K in keyof CaseEffects]: AsyncThunk<any, any, any> }> = {};
  const loadings: Partial<{ [K in keyof CaseEffects]: string }> = {};
  if (options.effects) {
    Object.keys(options.effects).forEach((prefix: keyof CaseEffects) => {
      const type = options.name + '/' + prefix;
      loadings[prefix] = type;
      const asyncThunk = createAsyncThunk(type, async (payload, store) => {
        store.dispatch(loading.actions.startLoading(type));
        try {
          const data = await options.effects[prefix]((store.getState() as any)[options.name], payload);
          return data;
        } catch (error) {
          store.dispatch(toast.actions.add({
            message: error.message || error,
            duration: 1.5,
            type: 'error'
          }));
        }
        finally {
          store.dispatch(loading.actions.endLoading(type));
        }
      });
      effects[prefix] = asyncThunk;
    });
  }

  const modal = createSlice({
    ...options,
    extraReducers: builder => {
      Object.keys(effects).forEach(prefix => {
        builder.addCase(effects[prefix]!.fulfilled, (state, action) => {
          return action.payload;
        });
      });
    }
  });

  Object.assign(modal.actions, effects);
  Object.assign(modal, { loadings });

  return modal as any;
}

