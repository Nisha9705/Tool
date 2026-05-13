import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import BottomNav from '../../components/BottomNav';

export default function DashboardScreen() {
  const navigate = useNavigate();
  const { currentUser, getPatients, getAllAssessments, logout } = useApp();
  const patients = getPatients();
  const assessments = getAllAssessments();

  const stats = [
    { label: 'Patients', value: patients.length, icon: '👧', color: '#1A6FE8' },
    { label: 'Assessments', value: assessments.length, icon: '📋', color: '#0CC8C8' },
    { label: 'High Risk', value: assessments.filter(a => a.riskLevel === 'High').length, icon: '⚠️', color: '#EF4444' },
    { label: 'Low Risk', value: assessments.filter(a => a.riskLevel === 'Low').length, icon: '✅', color: '#10B981' },
  ];

  const quickActions = [
    { icon: '➕', label: 'Add Patient', action: () => navigate('/patients/add'), color: '#1A6FE8' },
    { icon: '📋', label: 'Patients',   action: () => navigate('/patients'),     color: '#0CC8C8' },
    { icon: '📊', label: 'Analytics',  action: () => navigate('/analytics'),    color: '#6366F1' },
    { icon: '🕒', label: 'History',    action: () => navigate('/history'),      color: '#F59E0B' },
  ];

  const recentPatients = patients.slice(0, 3);

  function handleSignOut() {
    logout();
    navigate('/welcome');
  }

  return (
    <div className="screen" style={{ overflowY: 'auto' }}>
      <div className="orb orb-1" />

      {/* Header */}
      <div style={{ padding: '50px 20px 20px', background: 'linear-gradient(180deg, rgba(26,111,232,0.07) 0%, transparent 100%)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <div>
            <div style={{ color: 'var(--text-muted)', fontSize: 13, fontWeight: 600 }}>Good day,</div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: 'var(--text-primary)' }}>
              {currentUser?.name?.split(' ').slice(0, 2).join(' ')} 👋
            </h1>
          </div>

          {/* Top-right action buttons */}
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {/* Settings */}
            <button
              onClick={() => navigate('/settings')}
              title="Settings"
              style={{
                width: 40, height: 40, borderRadius: '50%',
                background: 'rgba(26,111,232,0.10)',
                border: '1px solid rgba(26,111,232,0.2)',
                fontSize: 18, cursor: 'pointer',
              }}
            >
              ⚙️
            </button>

            {/* Sign Out */}
            <button
              onClick={handleSignOut}
              title="Sign Out"
              style={{
                width: 40, height: 40, borderRadius: '50%',
                background: 'rgba(239,68,68,0.08)',
                border: '1px solid rgba(239,68,68,0.25)',
                fontSize: 18, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all 0.2s',
              }}
              onMouseOver={e => e.currentTarget.style.background = 'rgba(239,68,68,0.18)'}
              onMouseOut={e  => e.currentTarget.style.background = 'rgba(239,68,68,0.08)'}
            >
              🚪
            </button>

            {/* Avatar */}
            <div className="avatar">{currentUser?.name?.[0] || 'U'}</div>
          </div>
        </div>

        <span className="badge badge-primary" style={{ marginTop: 6 }}>
          🦷 Dentist
        </span>
      </div>

      <div className="page-content content-padded">
        {/* Stats */}
        <div className="stats-grid" style={{ marginBottom: 20 }}>
          {stats.map(s => (
            <div key={s.label} className="stat-card">
              <div style={{ fontSize: 28 }}>{s.icon}</div>
              <div className="stat-value" style={{ color: s.color }}>{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 12, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Quick Actions
        </h2>
        <div className="quick-actions-grid" style={{ marginBottom: 24 }}>
          {quickActions.map(a => (
            <button
              key={a.label}
              onClick={a.action}
              className="card"
              style={{ cursor: 'pointer', border: '1px solid var(--border)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, padding: '20px 16px', transition: 'all 0.2s', fontFamily: 'inherit' }}
              onMouseOver={e => e.currentTarget.style.borderColor = a.color}
              onMouseOut={e  => e.currentTarget.style.borderColor = 'var(--border)'}
            >
              <div style={{ fontSize: 30, width: 52, height: 52, borderRadius: 16, background: `${a.color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {a.icon}
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{a.label}</span>
            </button>
          ))}
        </div>

        {/* Recent patients */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Recent Patients
          </h2>
          <button
            onClick={() => navigate('/patients')}
            style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit' }}
          >
            View All →
          </button>
        </div>

        {recentPatients.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: 32, color: 'var(--text-muted)' }}>
            <div style={{ fontSize: 40, marginBottom: 10 }}>👶</div>
            <div>No patients yet. Add your first patient!</div>
            <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => navigate('/patients/add')}>
              + Add Patient
            </button>
          </div>
        ) : (
          recentPatients.map(p => (
            <div key={p.id} className="list-item" onClick={() => navigate(`/patients/${p.id}`)}>
              <div className="avatar" style={{ fontSize: 18 }}>{p.name[0]}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{p.name}</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: 13 }}>{p.age} yrs · {p.gender}</div>
              </div>
              <span style={{ color: 'var(--primary)', fontSize: 18 }}>›</span>
            </div>
          ))
        )}
      </div>

      <BottomNav active="home" />
    </div>
  );
}
