import { useNavigate } from 'react-router-dom';

export default function RoleSelectionScreen() {
  const navigate = useNavigate();

  return (
    <div className="screen-centered" style={{ padding: '40px 24px' }}>
      <div className="orb orb-1" /><div className="orb orb-2" />

      <div className="fade-in" style={{ width: '100%', maxWidth: 400 }}>
        <button className="back-btn" onClick={() => navigate('/welcome')} style={{ marginBottom: 24 }}>← Back</button>

        <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 8, color: 'var(--text-primary)' }}>Welcome, Dentist</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: 28, fontSize: 15 }}>
          Sign in or create an account to manage your patients.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Dentist card */}
          <div
            className="card"
            style={{
              display: 'flex', alignItems: 'center', gap: 18,
              border: '2px solid #F43F5E',
              boxShadow: '0 0 20px rgba(26,111,232,0.15)',
            }}
          >
            <div style={{ fontSize: 42, lineHeight: 1 }}>🦷</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 17, color: 'var(--text-primary)' }}>Dentist</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: 13, marginTop: 2 }}>
                Manage patients, run assessments, view full analytics
              </div>
            </div>
            <div style={{ marginLeft: 'auto', color: '#F43F5E', fontSize: 22 }}>✓</div>
          </div>
        </div>

        <button
          className="btn btn-primary btn-full btn-lg"
          style={{ marginTop: 28 }}
          onClick={() => navigate('/register?role=dentist')}
        >
          Continue as Dentist
        </button>

        <button
          className="btn btn-secondary btn-full"
          style={{ marginTop: 12 }}
          onClick={() => navigate('/login')}
        >
          Already have an account? Sign In
        </button>
      </div>
    </div>
  );
}
