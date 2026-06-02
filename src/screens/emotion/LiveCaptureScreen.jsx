import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function LiveCaptureScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [error, setError] = useState('');
  const [capturing, setCapturing] = useState(false);
  const [countdown, setCountdown] = useState(null);

  useEffect(() => {
    navigator.mediaDevices?.getUserMedia({ video: { facingMode: 'user' } })
      .then(s => { setStream(s); })
      .catch(() => setError('Camera not available. Using demo mode.'));
    return () => stream?.getTracks().forEach(t => t.stop());
  }, []);

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  function capturePhoto() {
    setCapturing(true);
    let c = 3;
    setCountdown(c);
    const interval = setInterval(() => {
      c--;
      if (c <= 0) { clearInterval(interval); setCountdown(null); navigate(`/patients/${id}/emotion/detect`); }
      else setCountdown(c);
    }, 1000);
  }

  return (
    <div className="screen">
      <div className="topbar">
        <button className="back-btn" onClick={() => { stream?.getTracks().forEach(t => t.stop()); navigate(`/patients/${id}/emotion/capture`); }}>← Back</button>
        <span className="topbar-title">Live Camera</span>
        <div />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, padding: '16px 20px', gap: 16 }}>
        {/* Camera viewport */}
        <div style={{ position: 'relative', width: '100%', maxWidth: 360, aspectRatio: '3/4', borderRadius: 20, overflow: 'hidden', background: '#FFFBF7', border: '2px solid rgba(244, 63, 94,0.4)' }}>
          {stream ? (
            <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)' }} />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12, color: '#000000' }}>
              <div style={{ fontSize: 60 }}>📷</div>
              <div style={{ fontSize: 14, textAlign: 'center', padding: '0 20px' }}>
                {error || 'Initializing camera...'}
              </div>
            </div>
          )}

          {/* Face overlay */}
          <div style={{
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
            width: 180, height: 220, border: '2px solid rgba(244, 63, 94,0.6)', borderRadius: '50% 50% 45% 45%',
            pointerEvents: 'none',
          }} />

          {/* Countdown overlay */}
          {countdown !== null && (
            <div style={{
              position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(0,0,0,0.5)', fontSize: 96, fontWeight: 900, color: '#F43F5E',
            }}>{countdown}</div>
          )}

          {/* Corner markers */}
          {['tl','tr','bl','br'].map(c => (
            <div key={c} style={{
              position: 'absolute', width: 24, height: 24,
              ...(c[0]==='t' ? {top:8}:{bottom:8}), ...(c[1]==='l' ? {left:8}:{right:8}),
              border: '3px solid #F59E0B', borderRadius: 2,
              borderRight: c[1]==='l' ? 'none' : '3px solid #F59E0B',
              borderLeft: c[1]==='r' ? 'none' : '3px solid #F59E0B',
              borderBottom: c[0]==='t' ? 'none' : '3px solid #F59E0B',
              borderTop: c[0]==='b' ? 'none' : '3px solid #F59E0B',
            }} />
          ))}
        </div>

        <p style={{ color: '#000000', fontSize: 13, textAlign: 'center' }}>
          Position the child's face in the oval frame. Ensure good lighting.
        </p>

        <button className="btn btn-primary btn-full btn-lg"
          onClick={capturePhoto} disabled={capturing}
          style={{ background: capturing ? '#E3D3C4' : undefined }}>
          {capturing ? `📸 Capturing in ${countdown}...` : '📸 Take Photo'}
        </button>

        {(error) && (
          <button className="btn btn-secondary btn-full" onClick={() => navigate(`/patients/${id}/emotion/detect`)}>
            Skip (Use Demo) →
          </button>
        )}
      </div>
    </div>
  );
}
