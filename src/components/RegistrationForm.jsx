import { useState } from 'react';
import PasswordField from './PasswordField.jsx';
import TextField from './TextField.jsx';

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

function RegistrationForm() {
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
    <div className="form-wrap">
      <p className="form-kicker">YOUR NEXT CHAPTER STARTS HERE</p>
      <h2 id="form-title">Create your profile</h2>
      <p className="form-intro">
        Just a few details to get you settled in.
      </p>

      <form className="registration-form" onSubmit={handleSubmit} noValidate>
        <TextField
          autoComplete="name"
          error={errors.name}
          id="name"
          label="Full name"
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="e.g. Alex Morgan"
          value={form.name}
        />
        <TextField
          autoComplete="email"
          error={errors.email}
          id="email"
          label="Email address"
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="you@example.com"
          type="email"
          value={form.email}
        />
        <PasswordField
          error={errors.password}
          hint="At least 8 characters, with a letter and a number."
          id="password"
          label="Password"
          onBlur={handleBlur}
          onChange={handleChange}
          onToggleVisibility={() => togglePasswordVisibility('password')}
          placeholder="Create a strong password"
          revealLabel="password"
          value={form.password}
          visible={passwordVisibility.password}
        />
        <PasswordField
          error={errors.confirmPassword}
          id="confirmPassword"
          label="Confirm password"
          onBlur={handleBlur}
          onChange={handleChange}
          onToggleVisibility={() => togglePasswordVisibility('confirmPassword')}
          placeholder="Enter your password again"
          revealLabel="confirmation"
          value={form.confirmPassword}
          visible={passwordVisibility.confirmPassword}
        />

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
          This demo saves your name and email on this device. Your password is
          never stored.
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
  );
}

export default RegistrationForm;
