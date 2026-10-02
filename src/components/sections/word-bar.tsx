export function WordBar() {
  const words = [
    "Murals",
    "Sculpture",
    "Augmented Reality",
    "CGI",
    "Public Art",
    "Facades",
    "Live Painting",
  ];

  return (
    <section className="wordbar" aria-hidden="true">
      <div className="wordbar__track">
        {words.map((word, i) => (
          <span key={`w1-${i}`}>
            {word}
            <i>◦</i>
          </span>
        ))}
        {words.map((word, i) => (
          <span key={`w2-${i}`}>
            {word}
            <i>◦</i>
          </span>
        ))}
      </div>
    </section>
  );
}
