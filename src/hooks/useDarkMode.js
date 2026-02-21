import { useEffect } from "react"
import useMediaQuery from "./useMediaQuery"
import { useLocalStorage } from "./useLocalStorage"
//pone el tema oscuro en la pagina en la que estemos
export default function useDarkMode() {
  // primero leemos la preferencia del sistema
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)")
  // usamos el hook de localStorage sin valor inicial para detectar si existe una preferencia guardada
  const [darkMode, setDarkMode] = useLocalStorage("useDarkMode")

  // Si no hay valor guardado aún (undefined), guardamos la preferencia del sistema
  // Esto asegura que en localStorage siempre haya true o false, no undefined
  useEffect(() => {
    if (typeof darkMode === 'undefined') {
      setDarkMode(Boolean(prefersDarkMode))
    }
  }, [darkMode, prefersDarkMode, setDarkMode])

  const enabled = typeof darkMode === 'boolean' ? darkMode : Boolean(prefersDarkMode)

  useEffect(() => {
    document.body.classList.toggle("dark-mode", enabled)
  }, [enabled])

  return [enabled, setDarkMode]
}
