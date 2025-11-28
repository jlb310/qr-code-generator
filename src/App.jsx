import React, { useEffect, useRef, useState } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { Download, Share2, Settings, Palette } from 'lucide-react';

const qrCode = new QRCodeStyling({
  width: 300,
  height: 300,
  image: "",
  dotsOptions: {
    color: "#4267b2",
    type: "rounded"
  },
  imageOptions: {
    crossOrigin: "anonymous",
    margin: 20
  }
});

function App() {
  const [url, setUrl] = useState("https://google.com");
  const [color1, setColor1] = useState("#3b82f6");
  const [color2, setColor2] = useState("#a855f7");
  const [dotType, setDotType] = useState("rounded");
  const [cornerType, setCornerType] = useState("extra-rounded");
  const ref = useRef(null);

  useEffect(() => {
    qrCode.append(ref.current);
  }, []);

  useEffect(() => {
    qrCode.update({
      data: url,
      dotsOptions: {
        type: dotType,
        gradient: {
          type: "linear",
          rotation: 45,
          colorStops: [
            { offset: 0, color: color1 },
            { offset: 1, color: color2 }
          ]
        }
      },
      cornersSquareOptions: {
        type: cornerType,
        color: color1 // Match the primary color for corners
      },
      cornersDotOptions: {
        type: "dot",
        color: color2 // Match secondary color for inner dots
      },
      backgroundOptions: {
        color: "#ffffff",
      }
    });
  }, [url, color1, color2, dotType, cornerType]);

  const onDownloadClick = () => {
    qrCode.download({
      extension: "png"
    });
  };

  return (
    <div className="container">
      <div className="left-panel">
        <h1 className="title">QR Studio</h1>

        <div className="card">
          <div className="control-group">
            <label><Settings size={16} style={{ display: 'inline', marginRight: '8px' }} /> Content</label>
            <input
              type="text"
              className="input-field"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Enter URL or text..."
            />
          </div>

          <div className="control-group">
            <label><Palette size={16} style={{ display: 'inline', marginRight: '8px' }} /> Colors (Gradient)</label>
            <div className="color-inputs">
              <div className="color-picker-wrapper">
                <input
                  type="color"
                  value={color1}
                  onChange={(e) => setColor1(e.target.value)}
                />
                <span>Start</span>
              </div>
              <div className="color-picker-wrapper">
                <input
                  type="color"
                  value={color2}
                  onChange={(e) => setColor2(e.target.value)}
                />
                <span>End</span>
              </div>
            </div>
          </div>

          <div className="control-group">
            <label>Style</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <select
                className="input-field"
                value={dotType}
                onChange={(e) => setDotType(e.target.value)}
              >
                <option value="square">Square</option>
                <option value="dots">Dots</option>
                <option value="rounded">Rounded</option>
                <option value="classy">Classy</option>
                <option value="classy-rounded">Classy Rounded</option>
              </select>

              <select
                className="input-field"
                value={cornerType}
                onChange={(e) => setCornerType(e.target.value)}
              >
                <option value="square">Square Corners</option>
                <option value="extra-rounded">Rounded Corners</option>
                <option value="dot">Dot Corners</option>
              </select>
            </div>
          </div>

          <button className="btn" onClick={onDownloadClick}>
            <Download size={20} />
            Download PNG
          </button>
        </div>
      </div>

      <div className="preview-container">
        <div className="qr-wrapper" ref={ref} />
        <p style={{ marginTop: '2rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
          High resolution preview
        </p>
      </div>
    </div>
  );
}

export default App;
