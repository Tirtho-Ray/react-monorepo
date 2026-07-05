import { useMemo, useState } from "react";
import { ActionList, Badge, Button, StatCard } from "@repo/ui";
import {
  calculateGrowth,
  formatCompactNumber,
  formatCurrency,
  formatPercent,
  getCompletionRate,
  pluralize,
} from "@repo/utils";
import "./App.css";

type RangeKey = "today" | "week" | "month";
type SegmentKey = "all" | "enterprise" | "commerce" | "support";

const rangeMultiplier: Record<RangeKey, number> = {
  today: 0.72,
  week: 1,
  month: 1.38,
};

const segmentMultiplier: Record<SegmentKey, number> = {
  all: 1,
  enterprise: 1.18,
  commerce: 0.92,
  support: 0.78,
};

const channelData = [
  { name: "Direct", value: 44, tone: "blue" },
  { name: "Partners", value: 28, tone: "green" },
  { name: "Campaigns", value: 18, tone: "amber" },
  { name: "Referrals", value: 10, tone: "rose" },
];

const teamLoad = [
  { name: "Sales", done: 82, total: 100 },
  { name: "Success", done: 68, total: 100 },
  { name: "Ops", done: 51, total: 100 },
  { name: "Finance", done: 36, total: 100 },
];

const accounts = [
  { company: "Northstar Labs", owner: "Anika", value: 184000, stage: "Expansion", health: "Strong" },
  { company: "Atlas Retail", owner: "Mahin", value: 126500, stage: "Renewal", health: "Watch" },
  { company: "OrbitPay", owner: "Lina", value: 98000, stage: "Pilot", health: "Strong" },
  { company: "UrbanCare", owner: "Rafi", value: 74000, stage: "Onboarding", health: "Stable" },
];

function App() {
  const [range, setRange] = useState<RangeKey>("week");
  const [segment, setSegment] = useState<SegmentKey>("all");
  const [completedActions, setCompletedActions] = useState(7);

  const dashboard = useMemo(() => {
    const multiplier = rangeMultiplier[range] * segmentMultiplier[segment];
    const revenue = Math.round(868000 * multiplier + completedActions * 6800);
    const previousRevenue = Math.round(792000 * multiplier);
    const pipeline = Math.round(1840000 * multiplier);
    const activeUsers = Math.round(54800 * multiplier + completedActions * 520);
    const completion = getCompletionRate(completedActions, 12);
    const growth = calculateGrowth(revenue, previousRevenue);
    const conversion = 18.4 + completedActions * 0.34 + (range === "month" ? 1.2 : 0);

    return { activeUsers, completion, conversion, growth, pipeline, revenue };
  }, [completedActions, range, segment]);

  const actions = [
    { label: "Review account risks", meta: "3 renewals need an owner note before 4 PM", status: "active" as const },
    { label: "Approve campaign budget", meta: "BDT 42K pending for partner acquisition", status: "queued" as const },
    { label: "Sync sales forecast", meta: "Forecast model refreshed 18 minutes ago", status: "done" as const },
    { label: "Publish success digest", meta: "Weekly customer summary is ready for review", status: "queued" as const },
  ];

  return (
    <main className="dashboardShell">
      <aside className="sidebar" aria-label="OneView navigation">
        <div className="brandMark" aria-hidden="true">OV</div>
        <nav>
          <a className="active" href="#overview">Overview</a>
          <a href="#accounts">Accounts</a>
          <a href="#pipeline">Pipeline</a>
          <a href="#reports">Reports</a>
        </nav>
        <div className="sidebarFooter">
          <span>Workspace</span>
          <strong>Dhaka Ops</strong>
        </div>
      </aside>

      <section className="dashboard" id="overview">
        <header className="topbar">
          <div>
            <Badge tone="success">Live dashboard</Badge>
            <h1>OneView</h1>
            <p>Unified revenue, customer, and team signals for daily operating decisions.</p>
          </div>
          <div className="toolbar" aria-label="Dashboard filters">
            <div className="segmented" aria-label="Date range">
              {(["today", "week", "month"] as RangeKey[]).map((item) => (
                <button
                  aria-pressed={range === item}
                  className={range === item ? "selected" : ""}
                  key={item}
                  onClick={() => setRange(item)}
                  type="button"
                >
                  {item}
                </button>
              ))}
            </div>
            <select
              aria-label="Customer segment"
              value={segment}
              onChange={(event) => setSegment(event.target.value as SegmentKey)}
            >
              <option value="all">All segments</option>
              <option value="enterprise">Enterprise</option>
              <option value="commerce">Commerce</option>
              <option value="support">Support</option>
            </select>
          </div>
        </header>

        <section className="summaryGrid" aria-label="Executive summary">
          <StatCard
            label="Revenue"
            value={formatCurrency(dashboard.revenue)}
            trend={formatPercent(dashboard.growth)}
            helper="Booked and projected for the selected view"
          />
          <StatCard
            label="Pipeline"
            value={formatCurrency(dashboard.pipeline)}
            trend="Open"
            helper="Qualified opportunities across active owners"
          />
          <StatCard
            label="Active users"
            value={formatCompactNumber(dashboard.activeUsers)}
            trend="Live"
            helper="Product usage across connected workspaces"
          />
          <StatCard
            label="Conversion"
            value={formatPercent(dashboard.conversion)}
            trend="Target 20%"
            helper="Lead to activated account rate"
          />
        </section>

        <section className="contentGrid">
          <article className="panel mainPanel" id="pipeline">
            <div className="panelHeader">
              <div>
                <Badge>Channel mix</Badge>
                <h2>Acquisition performance</h2>
              </div>
              <Button onClick={() => setCompletedActions((value) => Math.min(value + 1, 12))}>
                Log win
              </Button>
            </div>
            <div className="barChart" aria-label="Channel contribution chart">
              {channelData.map((channel) => (
                <div className="barRow" key={channel.name}>
                  <span>{channel.name}</span>
                  <div className="track">
                    <span className={channel.tone} style={{ width: `${channel.value}%` }} />
                  </div>
                  <strong>{channel.value}%</strong>
                </div>
              ))}
            </div>
          </article>

          <article className="panel progressPanel">
            <div className="panelHeader compact">
              <div>
                <Badge tone="warning">Readiness</Badge>
                <h2>Operating plan</h2>
              </div>
            </div>
            <div className="scoreBlock">
              <span>{pluralize(completedActions, "action")} closed</span>
              <strong>{formatPercent(dashboard.completion)}</strong>
              <div className="meter"><span style={{ width: `${dashboard.completion}%` }} /></div>
            </div>
            <div className="buttonPair">
              <Button variant="secondary" onClick={() => setCompletedActions(12)}>Complete</Button>
              <Button variant="ghost" onClick={() => setCompletedActions((value) => Math.max(value - 1, 0))}>Undo</Button>
            </div>
          </article>

          <article className="panel" id="accounts">
            <div className="panelHeader compact">
              <div>
                <Badge>Priority accounts</Badge>
                <h2>Customer movement</h2>
              </div>
            </div>
            <div className="accountList">
              {accounts.map((account) => (
                <div className="accountRow" key={account.company}>
                  <div>
                    <strong>{account.company}</strong>
                    <span>{account.stage} by {account.owner}</span>
                  </div>
                  <div className="accountValue">
                    <strong>{formatCurrency(account.value)}</strong>
                    <span className={account.health.toLowerCase()}>{account.health}</span>
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="panel">
            <div className="panelHeader compact">
              <div>
                <Badge tone="success">Team load</Badge>
                <h2>Execution capacity</h2>
              </div>
            </div>
            <div className="loadGrid">
              {teamLoad.map((team) => (
                <div className="loadItem" key={team.name}>
                  <div>
                    <strong>{team.name}</strong>
                    <span>{team.done}% allocated</span>
                  </div>
                  <div className="miniMeter"><span style={{ width: `${getCompletionRate(team.done, team.total)}%` }} /></div>
                </div>
              ))}
            </div>
          </article>

          <article className="panel actionPanel" id="reports">
            <div className="panelHeader compact">
              <div>
                <Badge tone="warning">Next actions</Badge>
                <h2>Decision queue</h2>
              </div>
            </div>
            <ActionList items={actions} />
          </article>
        </section>
      </section>
    </main>
  );
}

export default App;
