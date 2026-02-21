"use client"
import React, { useEffect, useRef, useState } from "react"

export default function PlaneDebug({ threePlaneRef }) {
  const [state, setState] = useState(null)
  const rafRef = useRef(null)
  const userInteractingRef = useRef(false)

  // Poll plane state via the imperative handle
  useEffect(() => {
    const loop = () => {
      try {
        const api = threePlaneRef && threePlaneRef.current
        if (api && typeof api.getState === 'function') {
          const s = api.getState()
          if (!userInteractingRef.current) setState(s)
        }
      } catch (e) {
        // ignore
      }
      rafRef.current = requestAnimationFrame(loop)
    }
    rafRef.current = requestAnimationFrame(loop)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [threePlaneRef])

  function setAxis(axis, value) {
    try {
      const api = threePlaneRef && threePlaneRef.current
      if (api && typeof api.setTargetRotation === 'function') {
        const patch = { ...(state && state.rotation ? state.rotation : { x: 0, y: 0, z: 0 }) }
        patch[axis] = value
        api.setTargetRotation(patch)
        setState((s) => s ? { ...s, rotation: { ...s.rotation, [axis]: value } } : s)
      }
    } catch (e) {
      // ignore
    }
  }

  function setPosAxis(axis, value) {
    try {
      const api = threePlaneRef && threePlaneRef.current
      if (api && typeof api.setTargetPosition === 'function') {
        const patch = { ...(state && state.position ? state.position : { x: 0, y: 0, z: 0 }) }
        patch[axis] = value
        api.setTargetPosition(patch)
        setState((s) => s ? { ...s, position: { ...s.position, [axis]: value } } : s)
      }
    } catch (e) {
      // ignore
    }
  }

  function handleRestart() {
    try {
      const api = threePlaneRef && threePlaneRef.current
      if (api && typeof api.restartEntry === 'function') api.restartEntry()
    } catch (e) {}
  }

  const r = state && state.rotation
  const vx = r ? r.x : 0
  const vy = r ? r.y : 0
  const vz = r ? r.z : 0
  const p = state && state.position
  const px = p ? p.x : 0
  const py = p ? p.y : 0
  const pz = p ? p.z : 0

  useEffect(() => {
    const handlePointerUp = () => { userInteractingRef.current = false }
    window.addEventListener('pointerup', handlePointerUp)
    window.addEventListener('touchend', handlePointerUp)
    return () => {
      window.removeEventListener('pointerup', handlePointerUp)
      window.removeEventListener('touchend', handlePointerUp)
    }
  }, [])

  return (
    <div style={{ position: 'fixed', right: 12, top: 12, zIndex: 9999, pointerEvents: 'auto' }}>
      <div style={{ width: 'min(320px,92vw)', maxHeight: '80vh', overflowY: 'auto', background: 'rgba(0,0,0,0.6)', color: 'white', padding: 12, borderRadius: 8, fontSize: 12, fontFamily: 'sans-serif', boxSizing: 'border-box' }}>
        <div style={{ fontWeight: 700, marginBottom: 8 }}>Plane Debug</div>
        <div style={{ marginBottom: 8 }}>
          <div style={{ opacity: 0.8 }}>Position:</div>
          <div style={{ fontFamily: 'monospace' }}>{state ? `${state.position.x.toFixed(3)}, ${state.position.y.toFixed(3)}, ${state.position.z.toFixed(3)}` : 'loading...'}</div>
        </div>
        <div style={{ marginBottom: 8 }}>
          <div style={{ opacity: 0.8 }}>Rotation (rad):</div>
          <div style={{ fontFamily: 'monospace' }}>{state && state.rotation ? `${state.rotation.x.toFixed(3)}, ${state.rotation.y.toFixed(3)}, ${state.rotation.z.toFixed(3)}` : 'loading...'}</div>
        </div>

        <div style={{ marginTop: 8 }}>
          <label style={{ display: 'block', fontSize: 12, opacity: 0.85 }}>X (pitch)</label>
          <input onPointerDown={() => (userInteractingRef.current = true)} onPointerCancel={() => (userInteractingRef.current = false)} onBlur={() => (userInteractingRef.current = false)} type="range" min={-1.5} max={1.5} step={0.01} value={vx} onChange={(e) => setAxis('x', parseFloat(e.target.value))} style={{ width: '100%' }} />
          <label style={{ display: 'block', fontSize: 12, opacity: 0.85 }}>Y (yaw)</label>
          <input onPointerDown={() => (userInteractingRef.current = true)} onPointerCancel={() => (userInteractingRef.current = false)} onBlur={() => (userInteractingRef.current = false)} type="range" min={-1.5} max={1.5} step={0.01} value={vy} onChange={(e) => setAxis('y', parseFloat(e.target.value))} style={{ width: '100%' }} />
          <label style={{ display: 'block', fontSize: 12, opacity: 0.85 }}>Z (roll)</label>
          <input onPointerDown={() => (userInteractingRef.current = true)} onPointerCancel={() => (userInteractingRef.current = false)} onBlur={() => (userInteractingRef.current = false)} type="range" min={-1.5} max={1.5} step={0.01} value={vz} onChange={(e) => setAxis('z', parseFloat(e.target.value))} style={{ width: '100%' }} />
        </div>

        <div style={{ marginTop: 12 }}>
          <div style={{ opacity: 0.85, marginBottom: 6 }}>Position controls</div>
          <label style={{ display: 'block', fontSize: 12, opacity: 0.85 }}>X</label>
          <input onPointerDown={() => (userInteractingRef.current = true)} onPointerCancel={() => (userInteractingRef.current = false)} onBlur={() => (userInteractingRef.current = false)} type="range" min={-3} max={3} step={0.01} value={px} onChange={(e) => setPosAxis('x', parseFloat(e.target.value))} style={{ width: '100%' }} />
          <label style={{ display: 'block', fontSize: 12, opacity: 0.85 }}>Y</label>
          <input onPointerDown={() => (userInteractingRef.current = true)} onPointerCancel={() => (userInteractingRef.current = false)} onBlur={() => (userInteractingRef.current = false)} type="range" min={-3} max={3} step={0.01} value={py} onChange={(e) => setPosAxis('y', parseFloat(e.target.value))} style={{ width: '100%' }} />
          <label style={{ display: 'block', fontSize: 12, opacity: 0.85 }}>Z</label>
          <input onPointerDown={() => (userInteractingRef.current = true)} onPointerCancel={() => (userInteractingRef.current = false)} onBlur={() => (userInteractingRef.current = false)} type="range" min={-6} max={6} step={0.01} value={pz} onChange={(e) => setPosAxis('z', parseFloat(e.target.value))} style={{ width: '100%' }} />
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
          <button onClick={handleRestart} style={{ flex: 1, padding: '6px 8px', borderRadius: 6, background: '#222', color: 'white', border: '1px solid rgba(255,255,255,0.06)' }}>Restart Entry</button>
        </div>
      </div>
    </div>
  )
}
