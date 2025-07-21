import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ArrowLeft, Plus } from "lucide-react";

interface ProjectHeaderProps {
  name: string;

}

const ProjectHeader = ({ name }: ProjectHeaderProps) => {
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    assignee: "",
    dueDate: "",
  });

  const handleCreateTask = () => {
    // Lógica para crear una nueva tarea
    console.log("Creando tarea:", newTask);
    setIsNewTaskOpen(false);
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/index" className="mr-4">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">{name}</h1>
          </div>
          <Dialog open={isNewTaskOpen} onOpenChange={setIsNewTaskOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Nueva Tarea
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Crear Nueva Tarea</DialogTitle>
                <DialogDescription>
                  Agrega una nueva tarea al proyecto {name}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    value={newTask.title}
                    onChange={(e) =>
                      setNewTask({ ...newTask, title: e.target.value })
                    }
                    placeholder="Título de la tarea"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    value={newTask.description}
                    onChange={(e) =>
                      setNewTask({ ...newTask, description: e.target.value })
                    }
                    placeholder="Descripción detallada de la tarea"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="assignee">Responsable</Label>
                  <Select
                    value={newTask.assignee}
                    onValueChange={(value) =>
                      setNewTask({ ...newTask, assignee: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar responsable" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="juan">Juan Pérez</SelectItem>
                      <SelectItem value="maria">María García</SelectItem>
                      <SelectItem value="carlos">Carlos López</SelectItem>
                      <SelectItem value="ana">Ana Rodríguez</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="dueDate">Fecha límite</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) =>
                      setNewTask({ ...newTask, dueDate: e.target.value })
                    }
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleCreateTask}>
                  Crear Tarea
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  );
};

export default ProjectHeader;