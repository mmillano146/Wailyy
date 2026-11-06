import { film } from "../../data/film";
import { Container } from "../ui/Container";

export function Footer() {
  return (
    <footer className="site-footer">
      <Container className="footer-inner">
        <p>{film.title}</p>
        <p>A film by {film.creator}</p>
      </Container>
    </footer>
  );
}
