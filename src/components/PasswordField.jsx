function PasswordField({
  error,
  hint,
  id,
  label,
  onBlur,
  onChange,
  onToggleVisibility,
  placeholder,
  revealLabel,
  value,
  visible,
}) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <div className="password-input">
        <input
          autoComplete="new-password"
          id={id}
          name={id}
          onBlur={onBlur}
          onChange={onChange}
          placeholder={placeholder}
          required
          type={visible ? 'text' : 'password'}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : hint ? hintId : undefined}
          value={value}
        />
        <button
          aria-controls={id}
          aria-label={`${visible ? 'Hide' : 'Show'} ${revealLabel}`}
          className="visibility-toggle"
          onClick={onToggleVisibility}
          type="button"
        >
          {visible ? 'Hide' : 'Show'}
        </button>
      </div>
      {error ? (
        <small id={errorId}>{error}</small>
      ) : (
        hint && (
          <small className="field-hint" id={hintId}>
            {hint}
          </small>
        )
      )}
    </div>
  );
}

export default PasswordField;
