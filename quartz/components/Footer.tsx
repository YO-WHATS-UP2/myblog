import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import style from "./styles/footer.scss"

interface Options {
  links: Record<string, string>
}

export default ((_opts?: Options) => {
  const Footer: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
    const year = new Date().getFullYear()
    return (
      <footer class={`${displayClass ?? ""}`}>
        <p>© {year} Sairam Bisoyi</p>
        <p style={{ marginTop: "10px", fontSize: "0.9em" }}>
          <strong>Credit:</strong> Website inspired by <a href="https://shibe-bit.github.io/" target="_blank" rel="noopener noreferrer">J Shivs Shankar</a> (<a href="https://github.com/stxrshivva" target="_blank" rel="noopener noreferrer">GitHub</a>).
        </p>
      </footer>
    )
  }

  Footer.css = style
  return Footer
}) satisfies QuartzComponentConstructor