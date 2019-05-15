import Typography from 'typography'
import fairyGatesTheme from 'typography-theme-fairy-gates'

fairyGatesTheme.googleFonts = [
  {
    name: 'Work Sans',
    styles: ['400', '400i', '600', '700'],
  },
]

fairyGatesTheme.bodyFontFamily = ['Work Sans', 'sans-serif']

fairyGatesTheme.overrideThemeStyles = () => {
  return {
    'a.gatsby-resp-image-link': {
      boxShadow: 'none',
    },
    'h1 a, h2 a, h3 a, h4 a, h5 a, h6 a': {
      backgroundImage: 'none',
    },
  }
}

const typography = new Typography(fairyGatesTheme)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
