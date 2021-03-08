import { extendTheme } from "@chakra-ui/react";

/**
 * Defines the color scheme(s) used by the application.
 */
const colors = {
    perlemirBrand: {
        50: "#e4e6ff",
        100: "#b3b6ff",
        200: "#8086ff",
        300: "#4e55fe",
        400: "#1d25fc",
        500: "#030be2",
        600: "#0008b1",
        700: "#000580",
        800: "#00034e",
        900: "#000020",
    },
    perlemirSecondary: {
        50: "#f9e4ff",
        100: "#e5b3ff",
        200: "#d181ff",
        300: "#bd4ffd",
        400: "#aa1efb",
        500: "#9004e1",
        600: "#7001b0",
        700: "#50007f",
        800: "#31004e",
        900: "#13001e",
    },
    perlemirAccent: {
        50: "#dbfefd",
        100: "#b6f6f0",
        200: "#8deee5",
        300: "#63e5da",
        400: "#3bded0",
        500: "#21c4b7",
        600: "#12998e",
        700: "#026e65",
        800: "#00423e",
        900: "#001815",
    },
}

/**
 * Bundle the above configuration as overrides for the original theme.
 * This is what gets exported and used within the app.
 */
export default extendTheme({
    colors,
});