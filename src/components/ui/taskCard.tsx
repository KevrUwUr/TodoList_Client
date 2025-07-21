import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Calendar,
  Edit,
  MessageSquare,
  MoreHorizontal,
  Trash2,
  User,
} from "lucide-react";
import { Button } from "./button";
import { Card, CardDescription, CardHeader, CardTitle } from "./card";

const getStatusColor = (status: string) => {
  switch (status) {
    case "completed":
      return "bg-green-100 text-green-800";
    case "in-progress":
      return "bg-blue-100 text-blue-800";
    case "todo":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "completed":
      return "Completada";
    case "in-progress":
      return "En Progreso";
    case "todo":
      return "Por Hacer";
    default:
      return status;
  }
};

interface TaskCardProps {
  title: string;
  description: string;
  status: string;
  assignee: string;
  dueDate: string;
  comments: number;
}

export const TaskCard = ({
  title,
  description,
  status,
  assignee,
  dueDate,
  comments,
}: TaskCardProps) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <CardTitle className="text-lg">{title}</CardTitle>
              <span className={getStatusColor(status)}>
                {getStatusText(status)}
              </span>
            </div>
            <CardDescription className="mb-3">{description}</CardDescription>
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                {assignee}
              </span>
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {dueDate}
              </span>
              <span className="flex items-center">
                <MessageSquare className="w-4 h-4 mr-1" />
                {comments} comentarios
              </span>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit className="w-4 h-4 mr-2" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MessageSquare className="w-4 h-4 mr-2" />
                Comentarios
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="w-4 h-4 mr-2" />
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
    </Card>
  );
};
