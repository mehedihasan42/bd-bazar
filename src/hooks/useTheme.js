
import ThemeContext from "@/contexts/ThemeContext";
import { useContext } from "react";

const useTheme = () => {
    const theme = useContext(ThemeContext)
    const isClient = typeof window !== "undefined"
    if(!isClient && !theme) return {}
    if(!theme){
        throw new Error("You must wrap your application")
    }
    return theme;
};

export default useTheme;