function TextField({
  autoComplete,
  error,
  id,
  label,
  onBlur,
  onChange,
  placeholder,
  type = 'text',
  value,
}) {
  const errorId = `${id}-error`;

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input
        autoComplete={autoComplete}
        id={id}
        name={id}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={placeholder}
        required
        type={type}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        value={value}
      />
      {error && <small id={errorId}>{error}</small>}
    </div>
  );
}

export default TextField;
