
import React, { useEffect, useRef, useState } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { Download, Share2, Settings, Palette } from 'lucide-react';

const qrCode = new QRCodeStyling({
  width: 1200, // High resolution
  height: 1200, // High resolution
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
      width: 1200,
      height: 1200,
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
      extension: "png",
      name: "digitals-qr"
    });
  };

  return (
    <div className="container">
      <div className="left-panel">
        <h1 className="title">Digitals QR Generator</h1>

        <div className="card">
          <div className="control-group">
            <label><Settings size={16} style={{ display: 'inline', marginRight: '8px' }} /> Contenido</label>
            <input
              type="text"
              className="input-field"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Ingresa URL o texto..."
            />
          </div>

          <div className="control-group">
            <label><Palette size={16} style={{ display: 'inline', marginRight: '8px' }} /> Colores (Degradado)</label>
            <div className="color-inputs">
              <div className="color-picker-wrapper">
                <input
                  type="color"
                  value={color1}
                  onChange={(e) => setColor1(e.target.value)}
                />
                <span>Inicio</span>
              </div>
              <div className="color-picker-wrapper">
                <input
                  type="color"
                  value={color2}
                  onChange={(e) => setColor2(e.target.value)}
                />
                <span>Fin</span>
              </div>
            </div>
          </div>

          <div className="control-group">
            <label>Estilo</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <select
                className="input-field"
                value={dotType}
                onChange={(e) => setDotType(e.target.value)}
              >
                <option value="square">Cuadrado</option>
                <option value="dots">Puntos</option>
                <option value="rounded">Redondeado</option>
                <option value="classy">Elegante</option>
                <option value="classy-rounded">Elegante Redondeado</option>
              </select>

              <select
                className="input-field"
                value={cornerType}
                onChange={(e) => setCornerType(e.target.value)}
              >
                <option value="square">Esquinas Cuadradas</option>
                <option value="extra-rounded">Esquinas Redondeadas</option>
                <option value="dot">Esquinas Punteadas</option>
              </select>
            </div>
          </div>

          <button className="btn" onClick={onDownloadClick}>
            <Download size={20} />
            Descargar PNG
          </button>
        </div>
      </div>

      <div className="preview-container">
        <div className="qr-wrapper" ref={ref} />
        <p style={{ marginTop: '2rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
          Vista previa de alta resolución
        </p>
      </div>
    </div>
  );
}

export default App;
