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

const baseRevenue = 68400;
const previousRevenue = 61200;
const baseVisitors = 42800;

function App() {
  const [completedActions, setCompletedActions] = useState(6);

  const dashboard = useMemo(() => {
    const revenue = baseRevenue + completedActions * 750;
    const visitors = baseVisitors + completedActions * 420;
    const completion = getCompletionRate(completedActions, 10);
    const growth = calculateGrowth(revenue, previousRevenue);

    return { completion, growth, revenue, visitors };
  }, [completedActions]);

  const actions = [
    { label: "Connect shared UI package", meta: "Reusable components are loading from @repo/ui", status: "done" as const },
    { label: "Apply utility actions", meta: "Money, growth, compact numbers, and progress use @repo/utils", status: "active" as const },
    { label: "Ship design system docs", meta: "Queued for the next workspace package", status: "queued" as const },
  ];

  return (
    <main className="workspace">
      <section className="heroPanel">
        <div className="heroCopy">
          <Badge tone="success">Monorepo connected</Badge>
          <h1>OneView workspace</h1>
          <p>
            Shared UI and utility packages are now driving this app from the
            workspace instead of local-only starter code.
          </p>
          <div className="actions">
            <Button onClick={() => setCompletedActions((value) => Math.min(value + 1, 10))}>
              Complete action
            </Button>
            <Button
              variant="ghost"
              onClick={() => setCompletedActions((value) => Math.max(value - 1, 0))}
            >
              Undo
            </Button>
          </div>
        </div>
        <div className="progressPanel" aria-label="Workspace progress">
          <span>{pluralize(completedActions, "action")} complete</span>
          <strong>{formatPercent(dashboard.completion)}</strong>
          <div className="meter">
            <span style={{ width: `${dashboard.completion}%` }} />
          </div>
        </div>
      </section>

      <section className="statsGrid" aria-label="Workspace metrics">
        <StatCard
          label="Revenue"
          value={formatCurrency(dashboard.revenue)}
          trend={formatPercent(dashboard.growth)}
          helper="Calculated with @repo/utils"
        />
        <StatCard
          label="Visitors"
          value={formatCompactNumber(dashboard.visitors)}
          trend="Live"
          helper="Compact number formatting"
        />
        <StatCard
          label="Package reuse"
          value="3 modules"
          helper="Button, Badge, StatCard, ActionList"
        />
      </section>

      <section className="detailsGrid">
        <div className="panel">
          <div className="sectionTitle">
            <Badge>Shared actions</Badge>
            <h2>What is wired in</h2>
          </div>
          <ActionList items={actions} />
        </div>
        <div className="panel highlight">
          <div className="sectionTitle">
            <Badge tone="warning">Next best step</Badge>
            <h2>Create more packages</h2>
          </div>
          <p>
            Add feature packages when logic becomes reusable. Keep apps focused on
            composition, routing, and product-specific behavior.
          </p>
          <Button variant="secondary" onClick={() => setCompletedActions(10)}>
            Mark all complete
          </Button>
        </div>
      </section>
    </main>
  );
}

export default App;
