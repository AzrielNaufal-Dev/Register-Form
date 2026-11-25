function WelcomePanel() {
  return (
    <section className="photo-panel" aria-label="Welcome to Grove">
      <div className="brand-lockup" aria-label="Grove">
        <span className="brand-mark" aria-hidden="true">
          <span />
          <span />
          <span />
        </span>
        <span>grove</span>
      </div>
      <div className="photo-copy">
        <p className="photo-eyebrow">A COMMUNITY FOR WHAT&apos;S NEXT</p>
        <h1>
          Make a little room for <em>growth.</em>
        </h1>
        <p className="photo-description">
          Find your people, share what you&apos;re learning, and make space for
          the things that matter.
        </p>
        <div className="photo-note">
          <span className="note-line" />
          <span>Good things grow together.</span>
        </div>
      </div>
      <p className="photo-credit">A quieter corner of the city</p>
    </section>
  );
}

export default WelcomePanel;
