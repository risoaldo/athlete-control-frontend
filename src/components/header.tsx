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
          <NavLink to="/dashboard">
            <Home className="h-4 w-4" />
            Inicio
          </NavLink>

          <NavLink to="/athletes">
            <CirclePlus className="w-4ƒ h-4" />
            Atleta
          </NavLink>

          <NavLink to="/schools">
            <CirclePlus className="w-4ƒ h-4" />
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
