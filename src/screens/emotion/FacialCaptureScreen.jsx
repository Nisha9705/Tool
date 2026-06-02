import { useNavigate, useParams } from 'react-router-dom';

export default function FacialCaptureScreen() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="screen" style={{ overflowY: 'auto' }}>
      <div className="topbar">
        <button className="back-btn" onClick={() => navigate(`/patients/${id}/emotion/permission`)}>← Back</button>
        <span className="topbar-title">Facial Capture</span>
        <div />
      </div>

      <div className="page-content fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
        <p style={{ color: '#000000', textAlign: 'center', fontSize: 14 }}>
          Position the child's face within the frame below. Make sure lighting is good and the face is clearly visible.
        </p>

        {/* Face frame */}
        <div style={{
          width: 260, height: 320, position: 'relative',
          border: '3px dashed #F43F5E', borderRadius: 24,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(244, 63, 94,0.05)',
          overflow: 'hidden',
        }}>
          {/* Corner markers */}
          {['top-left','top-right','bottom-left','bottom-right'].map(c => (
            <div key={c} style={{
              position: 'absolute',
              width: 20, height: 20,
              borderColor: '#F59E0B',
              borderStyle: 'solid',
              borderWidth: 0,
              ...(c.includes('top') ? { top: -2 } : { bottom: -2 }),
              ...(c.includes('left') ? { left: -2, borderLeftWidth: 4, borderTopWidth: c.includes('top') ? 4 : 0, borderBottomWidth: c.includes('bottom') ? 4 : 0 } : { right: -2, borderRightWidth: 4, borderTopWidth: c.includes('top') ? 4 : 0, borderBottomWidth: c.includes('bottom') ? 4 : 0 }),
            }} />
          ))}

          <div style={{ textAlign: 'center', color: '#000000' }}>
            <div style={{ fontSize: 64, marginBottom: 8 }}>😊</div>
            <div style={{ fontSize: 13 }}>Face frame</div>
          </div>

          {/* Scan line */}
          <div style={{
            position: 'absolute', left: 0, right: 0, height: 2,
            background: 'linear-gradient(90deg, transparent, #F43F5E, transparent)',
            animation: 'scanLine 2s linear infinite',
          }} />
        </div>

        <style>{`@keyframes scanLine { 0% { top: 0; } 100% { top: 100%; } }`}</style>

        <div style={{ display: 'flex', gap: 10, width: '100%', flexDirection: 'column' }}>
          <button className="btn btn-primary btn-full btn-lg" onClick={() => navigate(`/patients/${id}/emotion/live`)}>
            📷 Open Camera →
          </button>
          <button className="btn btn-secondary btn-full" onClick={() => navigate(`/patients/${id}/emotion/permission`)}>
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
}
