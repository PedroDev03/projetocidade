// theme.ts
import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        brand: {
          "500": { value: "#ff6347" }, // só um exemplo de cor
        },
      },
    },
  },
})

export const system = createSystem(defaultConfig, config)
