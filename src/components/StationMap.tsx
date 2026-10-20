import { useState } from 'react';
import type { Fuel, Station } from '../data/stations';
import { money } from '../data/stations';
import { Icon } from './Icon';
// Provider-neutral contract: replace this schematic with a provider using geographic coordinates.
export interface StationMapProps { stations: Station[]; selectedId: string | null; fuel: Fuel; onSelect: (id: string) => void }
export function StationMap({ stations, selectedId, fuel, onSelect }: StationMapProps) {
  const [zoom, setZoom] = useState(1);
  return <div className="station-map" aria-label="Illustrative station map, not geographically accurate">
    <div className="map-art" style={{ transform: `scale(${zoom})` }}>
      <svg className="map-roads" viewBox="0 0 900 700" preserveAspectRatio="none" aria-hidden="true"><rect width="900" height="700" fill="#eff0e9" /><path d="M530-30 560 80 520 200 590 330 530 430 620 550 660 730" stroke="#dce5d1" strokeWidth="90" fill="none" /><path d="M-20 550Q300 480 490 580T940 570V740H-20Z" fill="#d9e4e3" /><g stroke="#fff" strokeWidth="8" fill="none"><path d="M90 0 130 700M260 0 300 700M450 0 470 700M680 0 700 700M850 0 800 700M0 130 900 180M0 310 900 350M0 470 900 480" /><path d="M-30 650 920 50" strokeWidth="13" /></g><g stroke="#d4d7cb" strokeWidth="2" fill="none"><path d="M0 250 900 290M0 410 900 430M180 0 215 700M370 0 390 700M770 0 750 700" /></g><path d="M0 390Q320 270 900 400" fill="none" stroke="#e1d8ba" strokeWidth="10" /><path d="M0 390Q320 270 900 400" fill="none" stroke="#fff8e5" strokeWidth="6" /></svg>
      <span className="map-place richmond">RICHMOND HILL</span><span className="map-place markham">MARKHAM</span><span className="map-place scarborough">SCARBOROUGH</span><span className="map-place toronto">TORONTO</span><span className="map-water">Lake Ontario</span><span className="highway">407</span>
      {stations.map(station => <button key={station.id} className={`map-marker ${selectedId === station.id ? 'selected' : ''}`} style={{ left: `${station.position.x}%`, top: `${station.position.y}%` }} onClick={() => onSelect(station.id)} aria-label={`Select ${station.name}, demo ${money(station.prices[fuel])} cents per litre`} aria-pressed={selectedId === station.id}>{money(station.prices[fuel])}<span>¢</span></button>)}
    </div>
    <div className="map-label"><span className="status-dot" /> Map preview <span>· Illustrative locations</span></div>
    <div className="map-controls"><button aria-label="Zoom in" disabled={zoom >= 1.6} onClick={() => setZoom(Math.min(1.6, zoom + .2))}><Icon name="plus" /></button><button aria-label="Zoom out" disabled={zoom <= 1} onClick={() => setZoom(Math.max(1, zoom - .2))}><Icon name="minus" /></button><button aria-label="Reset map view" onClick={() => setZoom(1)}><Icon name="target" /></button></div>
    <p className="map-disclaimer">Placeholder map · No map service connected</p>
  </div>;
}
