import '../css/style.css'

export default function Header() {
  return (
    <header>
      <nav>
        <ul className="header-nav">
          <li>
            <a className="card-header-nav-contents" href="/">Home</a>
          </li>
          <li>
            <a className="card-header-nav-contents" href="/About_me">About me</a>
          </li>
          <li>
            <a className="card-header-nav-contents" href="/Contact">Contact</a>
          </li>
          <li>
            <a className="card-header-nav-contents" href="/Works">Works</a>
          </li>
          <li>
            <a className="card-header-nav-contents" href="/articles">Articles</a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
