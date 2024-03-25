import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        Ultra:["Ultra"],
        alton:["Train One"],
        kumar:['Kumar One'],
        sai:["Monomaniac One"]
      },
    },
  },
  plugins: [],
} satisfies Config;
