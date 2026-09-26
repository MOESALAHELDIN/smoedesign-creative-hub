'use client'

import { useState } from 'react'
import { capabilities } from '../lib/capabilities'

type AssetStatus = 'Draft' | 'In Review' | 'Approved' | 'Final'
type View = 'overview' | 'workspace' | 'clients' | 'onboarding'

const assets: { name: string; type: string; capability: string; status: AssetStatus; updated: string }[] = [
  { name: 'Northstar brand platform', type: 'Strategy deck', capability: 'Brand & Identity', status: 'In Review', updated: 'Today, 10:42' },
  { name: 'Launch film — 30s cut', type: 'Video', capability: 'Content & Campaigns', status: 'Approved', updated: 'Yesterday' },
  { name: 'Growth sprint readout', type: 'Presentation', capability: 'Growth & Performance', status: 'Draft', updated: 'Sep 24' },
  { name: 'Product experience audit', type: 'Report', capability: 'Digital Product', status: 'Final', updated: 'Sep 21' },
]

const clients = [
  { name: 'Northstar Health', initials: 'NH', engagement: 'Active', project: 'Brand platform', color: 'peach' },
  { name: 'Morrow Studio', initials: 'MS', engagement: 'Onboarding', project: 'Digital product sprint', color: 'blue' },
  { name: 'Aster & Co.', initials: 'AC', engagement: 'Active', project: 'Growth campaign', color: 'green' },
  { name: 'Cedar Labs', initials: 'CL', engagement: 'Lead', project: 'Strategy exploration', color: 'lavender' },
]

const statusClass = (status: string) => status.toLowerCase().replace(' ', '-')

export default function Home() {
  const [view, setView] = useState<View>('overview')
  const [selectedClient, setSelectedClient] = useState('Northstar Health')
  const [assetStatuses, setAssetStatuses] = useState<Record<string, AssetStatus>>({})
  const [comment, setComment] = useState('')
  const [commentSent, setCommentSent] = useState(false)

  function approveAsset(name: string) {
    setAssetStatuses((current) => ({ ...current, [name]: 'Approved' }))
    setCommentSent(false)
  }

  function sendComment(event: React.FormEvent) {
    event.preventDefault()
    if (!comment.trim()) return
    setCommentSent(true)
    setComment('')
  }

  return (
    <main className="appShell">
      <aside className="sidebar">
        <a className="sideBrand" href="#top">SMOEDESIGN <span>HUB</span></a>
        <div className="workspaceSwitch"><span className="avatar avatar-peach">S</span><span><b>SMOEDESIGN</b><small>Internal workspace</small></span><span className="chevron">⌄</span></div>
        <nav className="sideNav" aria-label="Workspace navigation">
          <p className="navLabel">Workspace</p>
          <button className={view === 'overview' ? 'navItem active' : 'navItem'} onClick={() => setView('overview')}><span>◈</span> Overview</button>
          <button className={view === 'workspace' ? 'navItem active' : 'navItem'} onClick={() => setView('workspace')}><span>▣</span> Client workspace <i>4</i></button>
          <button className={view === 'clients' ? 'navItem active' : 'navItem'} onClick={() => setView('clients')}><span>◎</span> Clients directory</button>
          <p className="navLabel navGap">Operations</p>
          <button className={view === 'onboarding' ? 'navItem active' : 'navItem'} onClick={() => setView('onboarding')}><span>↗</span> Onboarding <i className="newDot">2</i></button>
          <button className="navItem"><span>☷</span> Key decisions <i>8</i></button>
          <button className="navItem"><span>◷</span> Schedule</button>
        </nav>
        <div className="sideBottom"><div className="helpCard"><strong>Need a hand?</strong><span>Ask Hana about a project, client, or next step.</span><button>Open assistant ↗</button></div><button className="profile"><span className="avatar avatar-dark">MO</span><span><b>Mo Smoe</b><small>Admin</small></span><span className="more">•••</span></button></div>
      </aside>

      <section className="content" id="top">
        <header className="topbar"><div className="crumb"><span>Workspace</span><b>/</b><strong>{view === 'overview' ? 'Overview' : view === 'workspace' ? 'Client workspace' : view === 'clients' ? 'Clients directory' : 'Onboarding'}</strong></div><div className="topActions"><button className="iconButton" aria-label="Search">⌕</button><button className="iconButton hasAlert" aria-label="Notifications">♢</button><button className="primaryButton" onClick={() => setView('onboarding')}>+ New client</button></div></header>
        <div className="pageBody">
          {view === 'overview' && <Overview setView={setView} />}
          {view === 'workspace' && <Workspace selectedClient={selectedClient} setSelectedClient={setSelectedClient} assetStatuses={assetStatuses} approveAsset={approveAsset} comment={comment} setComment={setComment} sendComment={sendComment} commentSent={commentSent} />}
          {view === 'clients' && <Clients setView={setView} setSelectedClient={setSelectedClient} />}
          {view === 'onboarding' && <Onboarding />}
        </div>
      </section>
    </main>
  )
}

function Overview({ setView }: { setView: (view: View) => void }) {
  return <>
    <div className="welcome"><div><p className="overline">Tuesday, September 30, 2025</p><h1>Good morning, Mo<span>.</span></h1><p className="lede">Here&apos;s what&apos;s moving across the hub today.</p></div><button className="secondaryButton" onClick={() => setView('workspace')}>View client workspace <span>↗</span></button></div>
    <div className="statGrid"><Stat label="Active engagements" value="06" detail="+2 this month" trend="up"/><Stat label="Awaiting approval" value="04" detail="2 need your attention" trend="warm"/><Stat label="Onboarding" value="02" detail="Next: Cedar Labs" trend="neutral"/><Stat label="Decisions logged" value="28" detail="+6 this week" trend="up"/></div>
    <div className="dashboardGrid"><section className="panel wide"><div className="panelHeader"><div><p className="overline">Across all projects</p><h2>Project pulse</h2></div><button className="textButton" onClick={() => setView('workspace')}>View all ↗</button></div><div className="table"><div className="tableRow tableHead"><span>Project</span><span>Owner</span><span>Status</span><span>Next milestone</span></div>{assets.map((asset, index) => <div className="tableRow" key={asset.name}><span className="projectName"><span className={`projectMark mark-${index}`}>{['N','L','G','P'][index]}</span><b>{asset.name}</b><small>{asset.capability}</small></span><span className="owner"><span className="tinyAvatar">{['AK','MS','JD','SL'][index]}</span>{['Ava Kim','Mo Smoe','Jon Diaz','Sana Lee'][index]}</span><span><Badge status={asset.status}/></span><span className="muted">{['Client review · today','Final edit · Oct 2','Internal review · Oct 1','Delivered · Sep 21'][index]}</span></div>)}</div></section><section className="panel decisions"><div className="panelHeader"><div><p className="overline">Shared record</p><h2>Key decisions</h2></div><button className="moreButton">•••</button></div><div className="decision"><span className="decisionDot"/><div><b>Northstar tone of voice</b><p>Approved by Maya Chen</p><small>Today, 09:18</small></div></div><div className="decision"><span className="decisionDot blueDot"/><div><b>Homepage direction B</b><p>Flagged for revision</p><small>Yesterday, 16:42</small></div></div><div className="decision"><span className="decisionDot greenDot"/><div><b>Launch date confirmed</b><p>Aster &amp; Co. · Oct 14</p><small>Sep 28, 11:06</small></div></div><button className="fullButton">Open decision log ↗</button></section></div>
  </>
}

function Workspace({ selectedClient, setSelectedClient, assetStatuses, approveAsset, comment, setComment, sendComment, commentSent }: any) {
  const current = clients.find((client) => client.name === selectedClient) || clients[0]
  return <><div className="workspaceHero"><div><p className="overline">Client-facing lens</p><h1>Client workspace</h1><p className="lede">A clear place for work, feedback, and decisions to move forward.</p></div><button className="secondaryButton">Share workspace ↗</button></div><div className="clientBar"><div className={`clientLogo ${current.color}`}>{current.initials}</div><div><h2>{current.name}</h2><span>{current.project} · <b className="activeText">{current.engagement}</b></span></div><select value={selectedClient} onChange={(event) => setSelectedClient(event.target.value)} aria-label="Select client"><option>Northstar Health</option><option>Morrow Studio</option><option>Aster &amp; Co.</option><option>Cedar Labs</option></select></div><div className="workspaceTabs"><button className="tabActive">All work <span>12</span></button><button>Strategy</button><button>Design</button><button>Content</button><button>Decisions <span>3</span></button></div><div className="workspaceGrid"><section className="panel wide"><div className="panelHeader"><div><p className="overline">{current.name} · shared with client</p><h2>Project assets</h2></div><button className="textButton">Filter / Sort ↕</button></div><div className="assetList">{assets.map((asset) => { const status = assetStatuses[asset.name] || asset.status; return <div className="assetRow" key={asset.name}><span className={`fileIcon ${asset.type === 'Video' ? 'video' : ''}`}>{asset.type === 'Video' ? '▶' : '▤'}</span><div className="assetInfo"><b>{asset.name}</b><span>{asset.type} · {asset.updated}</span></div><span className="capabilityTag">{asset.capability}</span><Badge status={status}/><button className="rowMore" onClick={() => approveAsset(asset.name)} title="Approve asset">{status === 'In Review' ? 'Approve' : '•••'}</button></div>})}</div></section><section className="panel activity"><div className="panelHeader"><div><p className="overline">Live thread</p><h2>Feedback &amp; decisions</h2></div><span className="liveBadge"><i/> Live</span></div><div className="comment"><span className="tinyAvatar warmAvatar">MC</span><div><b>Maya Chen <small>Client</small></b><p>Could we see a little more warmth in the opening line?</p><time>Today, 09:18</time></div></div><div className="comment"><span className="tinyAvatar">AK</span><div><b>Ava Kim <small>SMOEDESIGN</small></b><p>Added two options to the brand platform for review.</p><time>Yesterday, 17:42</time></div></div><form className="commentForm" onSubmit={sendComment}><input value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Leave a comment..." aria-label="Leave a comment"/><button type="submit" aria-label="Send comment">↑</button></form>{commentSent && <p className="sentNote">Comment added to the decision trail.</p>}</section></div></>
}

function Clients({ setView, setSelectedClient }: any) { return <><div className="welcome"><div><p className="overline">Relationship view</p><h1>Clients directory</h1><p className="lede">Every relationship, engagement, and next move in one place.</p></div><button className="primaryButton" onClick={() => setView('onboarding')}>+ Add client</button></div><div className="filterBar"><div className="searchBox">⌕ <input placeholder="Search clients" aria-label="Search clients"/></div><div className="filterPills"><button className="pillActive">All <span>12</span></button><button>Lead <span>3</span></button><button>Onboarding <span>2</span></button><button>Active <span>6</span></button><button>Closed <span>1</span></button></div></div><div className="clientCards">{clients.map((client) => <button className="clientCard" key={client.name} onClick={() => { setSelectedClient(client.name); setView('workspace') }}><div className="clientCardTop"><span className={`clientLogo ${client.color}`}>{client.initials}</span><Badge status={client.engagement}/></div><h2>{client.name}</h2><p>{client.project}</p><div className="clientCardBottom"><span>Last activity <b>{client.name === 'Northstar Health' ? 'Today' : 'Sep 28'}</b></span><span>↗</span></div></button>)}</div></> }

function Onboarding() { const steps = ['Qualify','Client info','Brief','Route & schedule','Kickoff confirmation']; return <><div className="workspaceHero"><div><p className="overline">Pipeline · new engagement</p><h1>Onboarding</h1><p className="lede">Move the right clients from first fit to first deliverable.</p></div><div className="progressCount"><b>02</b><span>in progress</span></div></div><div className="onboardingLayout"><section className="panel onboardingPanel"><div className="panelHeader"><div><p className="overline">Morrow Studio</p><h2>Digital product sprint</h2></div><Badge status="Onboarding"/></div><div className="stepper">{steps.map((step, index) => <div className={`step ${index < 2 ? 'done' : index === 2 ? 'current' : ''}`} key={step}><span>{index < 2 ? '✓' : index + 1}</span><b>{step}</b>{index < steps.length - 1 && <i/>}</div>)}</div><div className="qualify"><p className="overline">Step 03 · Collect brief</p><h2>What are they trying to build?</h2><p>Give the specialist team enough context to route the work well the first time.</p><textarea placeholder="Share the client&apos;s goal, audience, constraints, and what success looks like..." aria-label="Client brief"/><div className="formActions"><button className="secondaryButton">Save draft</button><button className="primaryButton">Continue to routing <span>→</span></button></div></div></section><aside className="panel onboardingAside"><p className="overline">Charter logic</p><h2>Route with confidence.</h2><p>Hana will recommend a specialist team based on capability, scope, and timing.</p><div className="routeCard"><span className="routeIcon">◈</span><div><b>Recommended team</b><strong>Strategy + Digital Product</strong><small>Based on current brief</small></div></div><div className="scheduleCard"><span>Next available kickoff</span><b>Thu, Oct 2 · 11:00 AM</b><small>45 min · with Ava Kim</small></div></aside></div></> }

function Stat({ label, value, detail, trend }: { label: string; value: string; detail: string; trend: string }) { return <div className="stat"><p>{label}</p><strong>{value}</strong><span className={`trend ${trend}`}>{trend === 'up' ? '↗' : trend === 'warm' ? '!' : '·'} {detail}</span></div> }
function Badge({ status }: { status: string }) { return <span className={`badge badge-${statusClass(status)}`}>{status}</span> }

void capabilities
