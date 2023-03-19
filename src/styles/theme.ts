import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from './tailwind.config'

const config = resolveConfig(tailwindConfig)
const theme = config.theme

export default theme
