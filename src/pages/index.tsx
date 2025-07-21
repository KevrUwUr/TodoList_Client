import { Button } from "@/components/ui/button";
import DashboardCard from "@/components/ui/dashoardCard";
import { Input } from "@/components/ui/input";
import ProjectCard from "@/components/ui/projectCard";
import NewProjectModal from "@/components/NewProjectModal";
import { useProjects } from "@/hooks/useProjects";
import { Calendar, Check, CircleAlert, Plus, Search, Timer } from "lucide-react";
import { useState, useMemo } from "react";

const IndexPage = () => {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const { projects, createProject, loading, error } = useProjects();

  const filteredProjects = useMemo(() => {
    return projects.filter(project =>
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (activeFilter === "Todos" || project.status === activeFilter)
    );
  }, [projects, searchTerm, activeFilter]);

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Header con búsqueda y filtros */}
      <div className="bg-card rounded-lg p-6 shadow-sm border">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Barra de búsqueda */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              className={`pl-10`} 
              placeholder="Buscar proyectos..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Filtros */}
          <div className="flex gap-2 flex-wrap">
            {filters.map((filter) => (
              <Button 
                key={filter}
                variant={activeFilter === filter ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(filter)}
                className="min-w-20"
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <DashboardCard
          title="Proyectos Activos"
          value={2}
          icon={<Calendar className="w-5 h-5" />}
        />
        <DashboardCard 
          title="Tareas Completadas" 
          value={66} 
          icon={<Check className="w-5 h-5" />} 
        />
        <DashboardCard 
          title="En Progreso" 
          value={26} 
          icon={<Timer className="w-5 h-5" />} 
        />
        <DashboardCard 
          title="Pendientes" 
          value={14} 
          icon={<CircleAlert className="w-5 h-5" />} 
        />
      </div>

      {/* Sección de Proyectos */}
      <section className="bg-card rounded-lg p-6">
        <div className="space-y-6">
          {/* Header de la sección */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">
                Proyectos
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Gestiona todos tus proyectos activos
              </p>
            </div>
<Button 
              variant="default" 
              size="sm" 
              className="shrink-0"
              onClick={() => setModalOpen(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Nuevo proyecto
            </Button>
            <NewProjectModal open={modalOpen} onClose={() => setModalOpen(false)} onCreate={createProject} />
          </div>
          
          {/* Grid de proyectos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
{
              loading ? (
                <div>Loading...</div>
              ) : error ? (
                <div>Error fetching projects</div>
              ) : (
                filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    id={project.id}
                    name={project.name}
                    status={project.status}
                    description={project.description}
                    tasksCount={project.tasksCount}
                    completedTasks={project.completedTasks}
                    dueDate={project.dueDate}
                  />
                ))
              )
            }
          </div>
          
          {/* Estado vacío */}
          {projectsData.length === 0 && (
            <div className="text-center py-12">
              <div className="text-muted-foreground mb-4">
                <Calendar className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">No hay proyectos</h3>
                <p className="text-sm">Crea tu primer proyecto para comenzar</p>
              </div>
              <Button variant="default">
                <Plus className="w-4 h-4 mr-2" />
                Crear proyecto
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default IndexPage;
