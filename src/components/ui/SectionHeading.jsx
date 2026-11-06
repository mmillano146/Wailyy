export function SectionHeading({ number, title, tone = "dark", as: Tag = "h2" }) {
  return (
    <div className={`section-heading section-heading--${tone}`}>
      <span aria-hidden="true">{number}</span>
      <Tag>{title}</Tag>
    </div>
  );
}
