import { Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";

interface ProjectCardProps {
  id: number;
  name: string;
  description: string;
  status: string;
  completedTasks: number;
  tasksCount: number;
  dueDate: string;
}

const ProjectCard = ({
  id,
  name,
  description,
  status,
  completedTasks,
  tasksCount,
  dueDate,
}: ProjectCardProps) => {
  return (
    <>
      <Card key={id} className="hover:shadow-md transition-shadow">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-lg">
                <Link to={`/projects/${id}`} className="hover:text-blue-600">
                  {name}
                </Link>
              </CardTitle>
              <CardDescription className="mt-1">{description}</CardDescription>
            </div>
            <span className="rounded-4xl">
              {status === "completed" ? "Completado" : "Activo"}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>
                {completedTasks}/{tasksCount} tareas
              </span>
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {dueDate}
              </span>
            </div>
            <div className="w-24 bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{
                  width: `${(completedTasks / tasksCount) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ProjectCard;
