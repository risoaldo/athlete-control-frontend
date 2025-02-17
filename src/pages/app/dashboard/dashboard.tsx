import { PopularChart } from "./popular-modality-chart";
import { RegistrationAthleteMonth } from "./registration-athlete-month";
import { RegistrationChart } from "./registration-chart";
import { TotalAthleteSystem } from "./total-athlete-system";
import { TotalFootbolSchools } from "./total-football-schools";


export function Dashboard() {


  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

      <div className="grid grid-cols-3 gap-4">
        <RegistrationAthleteMonth />
        <TotalAthleteSystem />
        <TotalFootbolSchools />
      </div>

      <div className="grid grid-cols-9 gap-4">
        <RegistrationChart />
        <PopularChart />
      </div>

      {/* <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-4"> */}
        {/* <div className="relative flex items-center space-x-2 rounded-full bg-gray-200 p-2">
          {steps.map((step) => (
            <div
              key={step.number}
              className={`flex cursor-pointer items-center rounded-full px-4 py-2 transition-all ${active === step.number ? "z-10 bg-white font-bold text-blue-700" : active > step.number ? "z-0 bg-green-600 text-white" : "z-0 bg-gray-400 text-gray-700"}`}
              onClick={() => setActive(step.number)}
            >
              <span
                className={`mr-2 flex h-6 w-6 items-center justify-center rounded-full font-bold ${active > step.number ? "bg-green-800 text-white" : "bg-gray-500 text-white"}`}
              >
                {step.number}
              </span>
              {active === step.number && <span>{step.label}</span>}
            </div>
          ))}
        </div> */}
      {/* </div> */}
   
    </div>
  );
}
