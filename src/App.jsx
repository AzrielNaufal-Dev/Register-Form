import RegistrationForm from './components/RegistrationForm.jsx';
import WelcomePanel from './components/WelcomePanel.jsx';

function App() {
  return (
    <main className="signup-page">
      <WelcomePanel />
      <section className="form-panel" aria-labelledby="form-title">
        <RegistrationForm />
        <footer className="site-footer">
          <span>© {new Date().getFullYear()} Azriel Naufal Robie</span>
          <span>Made for new beginnings</span>
        </footer>
      </section>
    </main>
  );
}

export default App;
