import { Button } from "./button";
import { Users, Plus } from "lucide-react";
const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-gray-900">Inlaze Tasks</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Users className="w-4 h-4 mr-2" />
              Equipo
            </Button>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Proyecto
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
