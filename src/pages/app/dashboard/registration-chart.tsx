import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Line,
  LineChart,
  CartesianGrid,
} from "recharts";

const data = [
  { date: "10/10", athletes: "100" },
  { date: "12/10", athletes: "30" },
  { date: "13/10", athletes: "10" },
  { date: "14/10", athletes: "21" },
  { date: "15/10", athletes: "34" },
  { date: "16/10", athletes: "75" },
];
export function RegistrationChart() {
  return (
    <div className="col-span-6 border">
      <CardHeader className="flex-row items-center justify-between pb-8">
        <div className="space-y-1">
          <CardTitle className="text-base font-medium">
            Atletas no periodo
          </CardTitle>
          <CardDescription>
            Atletas cadastrados no sistema no periodo
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={data} style={{ fontSize: 12 }}>
            <CartesianGrid vertical={false} className="stroke-muted" />
            <XAxis dataKey="date" stroke="#888" axisLine={false} tickLine={false} dy={16} />
            <YAxis stroke="#888" axisLine={false} tickLine={false} width={80} />
            <Line type="linear" strokeWidth={2} dataKey="athletes" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </div>
  );
}
