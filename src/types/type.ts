import store from "../redux/store";

export type AppState = ReturnType<typeof store.getState>;

export type RootState = ReturnType<typeof store.getState>;
