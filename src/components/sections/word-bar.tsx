import React from "react";

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
          <React.Fragment key={`w1-${i}`}>
            <span>{word}</span>
            <i>◦</i>
          </React.Fragment>
        ))}
        {words.map((word, i) => (
          <React.Fragment key={`w2-${i}`}>
            <span>{word}</span>
            <i>◦</i>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
