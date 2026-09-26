'use client';

import { useState } from 'react';
import { capabilities } from '../lib/capabilities';

export default function Home() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const response = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Request failed');
      form.reset();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  return (
    <main className="shell">
      <nav className="nav" aria-label="Main navigation">
        <a className="brand" href="#top">SMOEDESIGN</a>
        <div className="navRight">
          <span className="navmeta">Creative Hub / 01</span>
          <a className="navCta" href="#start">Start a project <span aria-hidden="true">↗</span></a>
        </div>
      </nav>

      <section className="hero" id="top">
        <div className="heroCopy">
          <div className="eyebrow">SMOEDESIGN Creative Hub <span className="dot" aria-hidden="true" /></div>
          <h1>Ideas into work.<br />Work into value.</h1>
          <p>A connected creative operating layer for strategy, design, technology, growth and client delivery — coordinated through Hana.</p>
          <a className="heroLink" href="#capabilities">Explore capabilities <span aria-hidden="true">↓</span></a>
        </div>
        <div className="heroAside" aria-hidden="true"><span>01</span><span>Creative<br />operating layer</span></div>
      </section>

      <section className="section" id="capabilities">
        <div className="sectionhead"><div><div className="eyebrow">What we do</div><h2>Capabilities</h2></div><p>One system. Eight capabilities. The right team assembled around the problem, not the org chart.</p></div>
        <div className="grid">{capabilities.map(([number, title, description]) => <article className="card" key={number}><span className="num">{number}</span><div><h3>{title}</h3><p>{description}</p></div><span className="cardArrow" aria-hidden="true">↗</span></article>)}</div>
      </section>

      <section className="cta" id="start">
        <div className="ctaInner">
          <div className="ctaIntro"><div className="eyebrow">Start a project</div><h2>Tell Hana what you&apos;re trying to build.</h2><p>Share a little context and we&apos;ll connect you with the right people, ideas and next step.</p><div className="responseNote"><span className="pulse" aria-hidden="true" /> Usually responds within 1 business day</div></div>
          <form className="form" onSubmit={submit} aria-describedby="form-status"><h3>Project intake <span>01 / 05</span></h3><div className="progress"><span /></div><div className="formGrid"><div className="field"><label htmlFor="name">Name <i>*</i></label><input id="name" name="name" required autoComplete="name" placeholder="Your name" /></div><div className="field"><label htmlFor="email">Work email <i>*</i></label><input id="email" type="email" name="email" required autoComplete="email" placeholder="you@company.com" /></div></div><div className="field"><label htmlFor="company">Company</label><input id="company" name="company" autoComplete="organization" placeholder="Company or team name" /></div><div className="field"><label htmlFor="capability">What do you need? <i>*</i></label><select id="capability" name="capability" defaultValue="" required><option value="" disabled>Select a capability</option>{capabilities.map(([number, title]) => <option key={number} value={title}>{title}</option>)}</select></div><div className="field"><label htmlFor="brief">Brief <i>*</i></label><textarea id="brief" name="brief" required placeholder="What are you trying to achieve? Include context, goals, timing and constraints." /></div><button className="submit" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send to Hana'} <span aria-hidden="true">→</span></button><div id="form-status" className={`status ${status}`} role="status" aria-live="polite">{status === 'success' && 'Received. Hana can now triage the brief and route the work.'}{status === 'error' && 'Something went wrong. Please try again.'}</div></form>
        </div>
      </section>

      <footer className="footer"><span>SMOEDESIGN / Creative Hub</span><span>Strategy · Design · Development · Growth</span></footer>
    </main>
  );
}
