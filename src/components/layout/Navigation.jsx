import { Menu, Play, X } from "lucide-react";
import { useEffect, useState } from "react";
import { film, navigation } from "../../data/film";
import { Container } from "../ui/Container";

export function Navigation() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const closeOnWideScreen = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", closeOnWideScreen);
    return () => window.removeEventListener("resize", closeOnWideScreen);
  }, []);

  return (
    <header className="site-header">
      <Container className="nav-shell">
        <a className="wordmark" href="#top" aria-label={`${film.title}, home`}>
          <span>Adire</span>
          <span>People &amp; Process</span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="primary-navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>

        <nav
          id="primary-navigation"
          className={`primary-nav ${open ? "is-open" : ""}`}
          aria-label="Primary navigation"
        >
          <ul>
            {navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a className="watch-link" href="#watch" onClick={() => setOpen(false)}>
            Watch film
            <Play aria-hidden="true" size={15} fill="currentColor" />
          </a>
        </nav>
      </Container>
    </header>
  );
}
