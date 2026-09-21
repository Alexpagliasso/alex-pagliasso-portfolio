import { profile } from "../../data/portfolio";
import { desktopNavigation } from "../../data/sections";

function Brand() {
  return (
    <>
      &lt;<b>alex</b>.dev /&gt;
    </>
  );
}

export function Header() {
  return (
    <>
      <header className="mobile-appbar">
        <a
          className="mobile-brand"
          href="#home"
          aria-label="Alex Pagliasso — Home"
        >
          <Brand />
        </a>
        <div className="mobile-status">
          <span aria-hidden="true" /> open
        </div>
      </header>
      <header className="nav">
        <a className="brand" href="#home" aria-label="Alex Pagliasso — Home">
          <Brand />
        </a>
        <nav className="navlinks" aria-label="Navigazione principale">
          {desktopNavigation.map((id) => (
            <a key={id} href={`#${id}`}>
              {id}
            </a>
          ))}
        </nav>
      </header>
    </>
  );
}

export function Footer() {
  return (
    <footer>
      <div>
        <b>{profile.name}</b>
        <br />
        {profile.role} · {profile.location}
      </div>
      <div className="footer-details">
        <a href={`mailto:${profile.email}`}>{profile.email}</a> · {profile.languages}
      </div>
    </footer>
  );
}
