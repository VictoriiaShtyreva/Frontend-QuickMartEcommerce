import { createContext } from "react";
import { ColorThemeChange } from "../../misc/types/ColorThemeChange";

const ColorThemeContext = createContext<ColorThemeChange | null>(null);

export default ColorThemeContext;
