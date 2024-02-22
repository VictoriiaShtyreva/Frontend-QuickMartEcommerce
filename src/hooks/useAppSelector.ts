import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../types/type";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
