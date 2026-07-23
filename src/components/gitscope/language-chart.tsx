import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = [
  "oklch(0.72 0.18 258)",
  "oklch(0.75 0.17 155)",
  "oklch(0.82 0.17 85)",
  "oklch(0.72 0.2 330)",
  "oklch(0.7 0.19 30)",
  "oklch(0.68 0.15 200)",
  "oklch(0.75 0.14 100)",
  "oklch(0.65 0.2 280)",
];

export function LanguageChart({ data }: { data: { name: string; value: number }[] }) {
  if (!data.length) {
    return <div className="text-sm text-muted-foreground">No language data available.</div>;
  }
  return (
    <div className="flex flex-col md:flex-row items-center gap-6">
      <div className="w-48 h-48 shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={2}
              stroke="none"
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--color-popover)",
                border: "1px solid var(--color-border)",
                borderRadius: 8,
                fontSize: 12,
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="grid grid-cols-2 gap-x-6 gap-y-2 flex-1 w-full">
        {data.map((lang, i) => (
          <li key={lang.name} className="flex items-center gap-2 text-sm">
            <span
              className="h-2.5 w-2.5 rounded-full shrink-0"
              style={{ background: COLORS[i % COLORS.length] }}
            />
            <span className="font-medium">{lang.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
