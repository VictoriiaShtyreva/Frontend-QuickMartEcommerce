import { createContext } from "react";
import { ColorThemeChange } from "../../types/ColorThemeChange";

const ColorThemeContext = createContext<ColorThemeChange | null>(null);

export default ColorThemeContext;
