import { Separator } from "./ui/separator";
import { Home, CirclePlus } from "lucide-react";
import { NavLink } from "./nav-link";
import { AccountMenu } from "./account-menu";

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <h1>Logo</h1>

        <Separator orientation="vertical" className="h-6" />

        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink to="/athlete-control/dashboard">
            <Home className="h-4 w-4" />
            Início
          </NavLink>

          <NavLink to="/athlete-control/athletes">
            <CirclePlus className="h-4 w-4" />
            Atletas
          </NavLink>

          <NavLink to="/athlete-control/schools">
            <CirclePlus className="h-4 w-4" />
            Escolinhas
          </NavLink>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <AccountMenu />
        </div>
      </div>
    </div>
  );
}
