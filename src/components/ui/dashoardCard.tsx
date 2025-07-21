import type { ReactNode } from "react";
import { Card, CardContent } from "./card";

interface DashboardProps {
  icon?: ReactNode;
  title: string;
  value: number;
}

const DashboardCard = ({ icon, title, value }: DashboardProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center">
          <div className="p-2 bg-blue-100 rounded-lg">
            <span className="w-6 h-6 text-blue-600">
              {icon}
            </span>
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
