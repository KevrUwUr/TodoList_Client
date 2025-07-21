import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import ProjectHeader from "@/components/ui/projects/projectHeader";
import { SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { TaskCard } from "@/components/ui/taskCard";
import { Select, SelectTrigger } from "@radix-ui/react-select";
import { Calendar, Filter, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const ProjectInfo = () => {
  const { id } = useParams<{ id: string }>();
  const project_id = id ? parseInt(id, 10) : 0;

  const projectData = {
    name: "Proyecto de prueba",
    description: "Descripción del proyecto",
    createdAt: "2025/01/15",
    dueDate: "2025/03/30",
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const tasksData = [
    {
      id: 1,
      title: "Diseño de la interfaz de usuario",
      description: "Crear mockups y wireframes para la aplicación",
      status: "completed",
      dueDate: "2025/01/25",
      assignee: "María García",
      comments: 3,
    },
    {
      id: 2,
      title: "Configuración del backend",
      description: "Configurar servidor y base de datos",
      status: "in-progress",
      dueDate: "2025/01/30",
      assignee: "Juan Pérez",
      comments: 5,
    },
    {
      id: 3,
      title: "Implementación de autenticación",
      description: "Desarrollar sistema de login y registro",
      status: "todo",
      dueDate: "2025/02/05",
      assignee: "Carlos López",
      comments: 1,
    },
    {
      id: 4,
      title: "Testing y QA",
      description: "Realizar pruebas unitarias e integración",
      status: "todo",
      dueDate: "2025/02/15",
      assignee: "Ana Rodríguez",
      comments: 0,
    },
  ];

  const filteredTasks = tasksData.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  useEffect(() => {
    const fetchProjectData = (id: number) => {
      console.log(`Buscando data de ${id}`);
    };
    fetchProjectData(project_id);
  }, [project_id]);
  return (
    <div className="min-h-screen bg-background">
      {/* Header del Proyecto */}
      <ProjectHeader name={projectData.name} />

      {/* Contenido Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Información del Proyecto */}
        <section>
          <Card className="shadow-sm border">
            <CardHeader>
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold mb-2">
                    Información del Proyecto
                  </h2>
                  <CardDescription className="text-base">
                    {projectData.description}
                  </CardDescription>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4 border-t">
                  <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="font-medium">Creado:</span>
                      <span className="ml-1">{projectData.createdAt}</span>
                    </span>
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      <span className="font-medium">Vence:</span>
                      <span className="ml-1">{projectData.dueDate}</span>
                    </span>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        </section>

        {/* Filtros y Búsqueda */}
        <section>
          <Card className="shadow-sm border">
            <CardHeader>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">Filtros de Tareas</h3>
                  <p className="text-sm text-muted-foreground">
                    Busca y filtra las tareas del proyecto
                  </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-4">
                  {/* Barra de búsqueda */}
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Buscar tareas por título o descripción..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  {/* Selector de filtros */}
                  <div className="w-full lg:w-auto">
                    <Select
                      value={statusFilter}
                      onValueChange={setStatusFilter}
                    >
                      <SelectTrigger className="w-full lg:w-[200px] flex items-center justify-center">
                        <Filter className="w-4 h-4 mr-2" />
                        <SelectValue placeholder="Filtrar por estado" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos los estados</SelectItem>
                        <SelectItem value="todo">Por Hacer</SelectItem>
                        <SelectItem value="in-progress">En Progreso</SelectItem>
                        <SelectItem value="completed">Completadas</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        </section>

        {/* Lista de Tareas */}
        <section>
          <Card className="shadow-sm border">
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h3 className="text-xl font-semibold">Tareas del Proyecto</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {filteredTasks.length === tasksData.length
                      ? `Mostrando todas las tareas (${tasksData.length})`
                      : `Mostrando ${filteredTasks.length} de ${tasksData.length} tareas`}
                  </p>
                </div>
              </div>
            </CardHeader>

            {/* Contenido de las tareas */}
            <div className="px-6 pb-6">
              <div className="space-y-4">
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      title={task.title}
                      status={task.status}
                      dueDate={task.dueDate}
                      description={task.description}
                      comments={task.comments}
                      assignee={task.assignee}
                    />
                  ))
                ) : (
                  <Card className="p-12 text-center border-dashed">
                    <div className="text-muted-foreground">
                      <Filter className="w-16 h-16 mx-auto mb-4 opacity-30" />
                      <h4 className="text-lg font-medium mb-2 text-foreground">
                        No se encontraron tareas
                      </h4>
                      <p className="text-sm max-w-md mx-auto">
                        {searchTerm
                          ? `No hay tareas que coincidan con "${searchTerm}". Intenta con otros términos de búsqueda.`
                          : statusFilter !== "all"
                          ? `No hay tareas con el estado "${statusFilter}". Prueba con otros filtros.`
                          : "Aún no se han creado tareas para este proyecto. ¡Comienza creando la primera!"}
                      </p>
                    </div>
                  </Card>
                )}
              </div>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
};
