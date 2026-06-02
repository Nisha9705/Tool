import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';

export default function AIPredictionScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getAssessment } = useApp();
  const aId = sessionStorage.getItem('latest_assessment_id');
  const a = getAssessment(aId);
  const [step, setStep] = useState(0);
  const steps = ['Loading patient profile...', 'Applying anxiety weights...', 'Integrating facial data...', 'Running cooperation model...', 'Finalizing prediction...'];

  useEffect(() => {
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setStep(i);
      if (i >= steps.length) { clearInterval(iv); setTimeout(() => navigate(`/patients/${id}/behaviour`), 800); }
    }, 600);
    return () => clearInterval(iv);
  }, []);

  if (!a) return null;

  return (
    <div className="screen-centered" style={{ padding: '40px 24px' }}>
      <div className="orb orb-1" /><div className="orb orb-3" />

      <div className="fade-in" style={{ width: '100%', maxWidth: 400, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
        <div style={{ fontSize: 72 }} className="pulse">🧬</div>
        <h1 style={{ fontSize: 24, fontWeight: 800, textAlign: 'center' }}>AI Prediction Engine</h1>

        <div style={{ width: '100%', background: '#f1e2d6', borderRadius: 16, overflow: 'hidden', padding: 16, fontFamily: 'monospace', fontSize: 12, color: '#F59E0B', lineHeight: 2 }}>
          <div style={{ color: '#6B554F' }}>&gt; PediPredict AI v2.1</div>
          {steps.slice(0, step).map((s, i) => (
            <div key={i} style={{ color: i === step - 1 ? '#FAF2EC' : '#34D399' }}>
              {i === step - 1 ? '⟳ ' : '✓ '}{s}
            </div>
          ))}
          {step < steps.length && <div style={{ color: '#F43F5E' }} className="pulse">_</div>}
        </div>

        <div style={{ display: 'flex', gap: 12, width: '100%' }}>
          <div className="card" style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: '#6B554F', textTransform: 'uppercase' }}>Input Score</div>
            <div style={{ fontSize: 24, fontWeight: 800, color: '#F43F5E' }}>{a.anxietyScore}%</div>
          </div>
          <div className="card" style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: '#6B554F', textTransform: 'uppercase' }}>Emotion</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#F59E0B' }}>{a.emotion}</div>
          </div>
          <div className="card" style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: '#6B554F', textTransform: 'uppercase' }}>Risk</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: a.riskLevel === 'Low' ? '#34D399' : a.riskLevel === 'High' ? '#F87171' : '#FBBF24' }}>{a.riskLevel}</div>
          </div>
        </div>

        <div style={{ color: '#6B554F', fontSize: 12, textAlign: 'center' }}>
          Redirecting to results...
        </div>
      </div>
    </div>
  );
}
