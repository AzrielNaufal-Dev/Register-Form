import { useState } from 'react';

const initialForm = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
  termsAccepted: false,
};

const fieldNames = ['name', 'email', 'password', 'confirmPassword', 'termsAccepted'];
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const profileStorageKey = 'grove-registration-profile';

function validateField(name, value, form) {
  switch (name) {
    case 'name':
      return value.trim() ? '' : 'Enter your full name.';
    case 'email':
      if (!value.trim()) return 'Enter your email address.';
      return emailPattern.test(value.trim()) ? '' : 'Enter a valid email address.';
    case 'password':
      if (!value) return 'Create a password.';
      if (value.length < 8) return 'Use at least 8 characters.';
      return /[A-Za-z]/.test(value) && /\d/.test(value)
        ? ''
        : 'Include at least one letter and one number.';
    case 'confirmPassword':
      if (!value) return 'Confirm your password.';
      return value === form.password ? '' : 'Your passwords do not match.';
    case 'termsAccepted':
      return value ? '' : 'Please accept the terms to continue.';
    default:
      return '';
  }
}

function saveProfile(profile) {
  try {
    window.localStorage.setItem(profileStorageKey, JSON.stringify(profile));
  } catch (error) {
    if (
      error instanceof DOMException &&
      (error.name === 'QuotaExceededError' || error.name === 'SecurityError')
    ) {
      return false;
    }

    throw error;
  }

  return true;
}

function App() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [passwordVisibility, setPasswordVisibility] = useState({
    password: false,
    confirmPassword: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const isFormValid = fieldNames.every(
    (name) => !validateField(name, form[name], form),
  );

  function handleChange(event) {
    const { name, type, checked, value } = event.target;
    setForm((previousForm) => ({
      ...previousForm,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setErrors((previousErrors) => {
      const nextErrors = { ...previousErrors };
      delete nextErrors[name];
      if (name === 'password') delete nextErrors.confirmPassword;
      return nextErrors;
    });
    setStatus({ type: '', message: '' });
  }

  function handleBlur(event) {
    const { name, value, checked, type } = event.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    setErrors((previousErrors) => ({
      ...previousErrors,
      [name]: validateField(name, fieldValue, form),
    }));
  }

  function togglePasswordVisibility(name) {
    setPasswordVisibility((previousVisibility) => ({
      ...previousVisibility,
      [name]: !previousVisibility[name],
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = Object.fromEntries(
      fieldNames.map((name) => [
        name,
        validateField(name, form[name], form),
      ]),
    );
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) return;

    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      await new Promise((resolve) => window.setTimeout(resolve, 1000));
      const saved = saveProfile({
        name: form.name.trim(),
        email: form.email.trim(),
      });

      if (!saved) {
        setStatus({
          type: 'error',
          message: 'We could not save your profile. Please check your browser storage settings and try again.',
        });
        return;
      }

      setForm(initialForm);
      setErrors({});
      setPasswordVisibility({ password: false, confirmPassword: false });
      setStatus({
        type: 'success',
        message: 'Your profile is saved on this device. Your password is never stored.',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="signup-page">
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

      <section className="form-panel" aria-labelledby="form-title">
        <div className="form-wrap">
          <p className="form-kicker">YOUR NEXT CHAPTER STARTS HERE</p>
          <h2 id="form-title">Create your profile</h2>
          <p className="form-intro">
            Just a few details to get you settled in.
          </p>

          <form className="registration-form" onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="name">Full name</label>
              <input
                autoComplete="name"
                id="name"
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="e.g. Alex Morgan"
                required
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'name-error' : undefined}
                value={form.name}
              />
              {errors.name && <small id="name-error">{errors.name}</small>}
            </div>

            <div className="field">
              <label htmlFor="email">Email address</label>
              <input
                autoComplete="email"
                id="email"
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="you@example.com"
                required
                type="email"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'email-error' : undefined}
                value={form.email}
              />
              {errors.email && <small id="email-error">{errors.email}</small>}
            </div>

            <div className="field">
              <label htmlFor="password">Password</label>
              <div className="password-input">
                <input
                  autoComplete="new-password"
                  id="password"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  required
                  type={passwordVisibility.password ? 'text' : 'password'}
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={
                    errors.password ? 'password-error' : 'password-hint'
                  }
                  value={form.password}
                />
                <button
                  aria-controls="password"
                  aria-label={
                    passwordVisibility.password ? 'Hide password' : 'Show password'
                  }
                  className="visibility-toggle"
                  onClick={() => togglePasswordVisibility('password')}
                  type="button"
                >
                  {passwordVisibility.password ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.password ? (
                <small id="password-error">{errors.password}</small>
              ) : (
                <small className="field-hint" id="password-hint">
                  At least 8 characters, with a letter and a number.
                </small>
              )}
            </div>

            <div className="field">
              <label htmlFor="confirmPassword">Confirm password</label>
              <div className="password-input">
                <input
                  autoComplete="new-password"
                  id="confirmPassword"
                  name="confirmPassword"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="Enter your password again"
                  required
                  type={passwordVisibility.confirmPassword ? 'text' : 'password'}
                  aria-invalid={Boolean(errors.confirmPassword)}
                  aria-describedby={
                    errors.confirmPassword
                      ? 'confirmPassword-error'
                      : undefined
                  }
                  value={form.confirmPassword}
                />
                <button
                  aria-controls="confirmPassword"
                  aria-label={
                    passwordVisibility.confirmPassword
                      ? 'Hide confirmation'
                      : 'Show confirmation'
                  }
                  className="visibility-toggle"
                  onClick={() => togglePasswordVisibility('confirmPassword')}
                  type="button"
                >
                  {passwordVisibility.confirmPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {errors.confirmPassword && (
                <small id="confirmPassword-error">{errors.confirmPassword}</small>
              )}
            </div>

            <div className="terms-field">
              <input
                checked={form.termsAccepted}
                id="termsAccepted"
                name="termsAccepted"
                onBlur={handleBlur}
                onChange={handleChange}
                required
                type="checkbox"
                aria-invalid={Boolean(errors.termsAccepted)}
                aria-describedby={
                  errors.termsAccepted ? 'termsAccepted-error' : undefined
                }
              />
              <label htmlFor="termsAccepted">
                I agree to the terms and conditions.
              </label>
            </div>
            {errors.termsAccepted && (
              <small className="terms-error" id="termsAccepted-error">
                {errors.termsAccepted}
              </small>
            )}

            <button
              className="submit-button"
              disabled={!isFormValid || isSubmitting}
              type="submit"
            >
              {isSubmitting ? (
                <>
                  <span className="loading-indicator" aria-hidden="true" />
                  Saving your profile...
                </>
              ) : (
                <>
                  Create your profile
                  <span aria-hidden="true">→</span>
                </>
              )}
            </button>

            <p className="privacy-note">
              This demo saves your name and email on this device. Your password
              is never stored.
            </p>

            {status.message && (
              <p
                className={`form-status ${status.type}`}
                role={status.type === 'error' ? 'alert' : 'status'}
                aria-live="polite"
              >
                {status.message}
              </p>
            )}
          </form>
        </div>
        <footer className="site-footer">
          <span>© {new Date().getFullYear()} Azriel Naufal Robie</span>
          <span>Made for new beginnings</span>
        </footer>
      </section>
    </main>
  );
}

export default App;
