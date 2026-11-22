import '../css/style.css'

export default function Header() {
  return (
    <header>
      <nav>
        <ul className="header-nav">
          <li>
            <a className="card-header-nav-contents" href="/place">Home</a>
          </li>
          <li>
            <a className="card-header-nav-contents" href="/place/About_me">About me</a>
          </li>
          <li>
            <a className="card-header-nav-contents" href="/place/Contact">Contact</a>
          </li>
          <li>
            <a className="card-header-nav-contents" href="/place/Works">Works</a>
          </li>
          <li>
            <a className="card-header-nav-contents" href="/place/articles">Articles</a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
