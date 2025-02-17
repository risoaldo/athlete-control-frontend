import { Outlet } from "react-router-dom";

export function SigInLayout() {
  return (
       <div className="flex flex-col items-center justify-center min-h-screen">
        <Outlet />
      </div>
  )
}