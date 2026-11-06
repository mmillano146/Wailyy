import { ArrowDown, Play } from "lucide-react";

export function PrimaryAction({ href, children, icon = "play", onClick, className = "" }) {
  const Icon = icon === "down" ? ArrowDown : Play;
  const classes = `primary-action ${className}`.trim();

  if (href) {
    return (
      <a className={classes} href={href} onClick={onClick}>
        <span>{children}</span>
        <Icon aria-hidden="true" size={17} strokeWidth={1.8} />
      </a>
    );
  }

  return (
    <button className={classes} type="button" onClick={onClick}>
      <span>{children}</span>
      <Icon aria-hidden="true" size={17} strokeWidth={1.8} />
    </button>
  );
}
