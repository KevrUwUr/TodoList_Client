import { Button } from "@/components/ui/button";
import DashboardCard from "@/components/ui/dashoardCard";
import { Input } from "@/components/ui/input";
import ProjectCard from "@/components/ui/projectCard";
import {
  Calendar,
  Check,
  CircleAlert,
  Plus,
  Search,
  Timer,
} from "lucide-react";
import { useState, useMemo } from "react";

// Tipo de datos para un proyecto
export interface Project {
  id: number;
  name: string;
  status: string;
  description: string;
  tasksCount: number;
  completedTasks: number;
  dueDate: string;
  createdAt?: string;
  updatedAt?: string;
}

// Tipo para las estadísticas del dashboard
export interface ProjectStats {
  activeProjects: number;
  completedTasks: number;
  inProgress: number;
  pending: number;
}

const IndexPage = () => {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [searchTerm, setSearchTerm] = useState("");
  const projectsData = [
    {
      id: 1,
      name: "Sistema de Gestión Empresarial",
      status: "Activo",
      description:
        "Sistema completo de gestión empresarial con dashboard interactivo, reportes en tiempo real y módulos de CRM",
      tasksCount: 32,
      completedTasks: 24,
      dueDate: "28/02/2025",
      createdAt: "2024-11-15",
      updatedAt: "2025-01-20",
    },
    {
      id: 2,
      name: "App Mobile TodoList Pro",
      status: "Activo",
      description:
        "Aplicación móvil avanzada para gestión de tareas con sincronización en la nube y notificaciones inteligentes",
      tasksCount: 18,
      completedTasks: 12,
      dueDate: "15/03/2025",
      createdAt: "2024-12-01",
      updatedAt: "2025-01-18",
    },
    {
      id: 3,
      name: "E-commerce Marketplace",
      status: "Completado",
      description:
        "Plataforma de comercio electrónico multivendedor con sistema de pagos, inventario y análisis de ventas",
      tasksCount: 45,
      completedTasks: 45,
      dueDate: "15/01/2025",
      createdAt: "2024-09-01",
      updatedAt: "2025-01-15",
    },
    {
      id: 4,
      name: "Dashboard Analytics",
      status: "Activo",
      description:
        "Dashboard de análisis de datos con visualizaciones interactivas y reportes automatizados para empresas",
      tasksCount: 22,
      completedTasks: 15,
      dueDate: "10/04/2025",
      createdAt: "2024-12-10",
      updatedAt: "2025-01-19",
    },
    {
      id: 5,
      name: "API REST Microservicios",
      status: "Activo",
      description:
        "Arquitectura de microservicios con API REST, autenticación JWT y documentación completa con Swagger",
      tasksCount: 28,
      completedTasks: 8,
      dueDate: "20/05/2025",
      createdAt: "2024-12-20",
      updatedAt: "2025-01-21",
    },
    {
      id: 6,
      name: "Sistema de Inventario",
      status: "Pendiente",
      description:
        "Sistema web para control de inventario con códigos de barras, alertas de stock y reportes de movimientos",
      tasksCount: 35,
      completedTasks: 5,
      dueDate: "30/06/2025",
      createdAt: "2025-01-05",
      updatedAt: "2025-01-21",
    },
    {
      id: 7,
      name: "Chatbot IA Soporte",
      status: "Activo",
      description:
        "Chatbot inteligente para atención al cliente con procesamiento de lenguaje natural y integración con CRM",
      tasksCount: 20,
      completedTasks: 14,
      dueDate: "25/04/2025",
      createdAt: "2024-11-30",
      updatedAt: "2025-01-20",
    },
    {
      id: 8,
      name: "Plataforma de Streaming",
      status: "Completado",
      description:
        "Plataforma de video streaming con reproductor personalizado, sistema de suscripciones y analytics",
      tasksCount: 38,
      completedTasks: 38,
      dueDate: "20/12/2024",
      createdAt: "2024-08-15",
      updatedAt: "2024-12-20",
    },
    {
      id: 9,
      name: "App de Fitness y Salud",
      status: "Activo",
      description:
        "Aplicación móvil para seguimiento de ejercicios, nutrición y métricas de salud con gamificación",
      tasksCount: 26,
      completedTasks: 19,
      dueDate: "15/05/2025",
      createdAt: "2024-10-01",
      updatedAt: "2025-01-19",
    },
    {
      id: 10,
      name: "Sistema de Reservas Online",
      status: "Pendiente",
      description:
        "Sistema web para reservas de servicios con calendario interactivo, pagos online y gestión de clientes",
      tasksCount: 30,
      completedTasks: 3,
      dueDate: "01/08/2025",
      createdAt: "2025-01-10",
      updatedAt: "2025-01-21",
    },
  ];

  // Stats calculados manualmente para simplificar
  type ProjectStats = {
    activeProjects: number;
    completedTasks: number;
    inProgress: number;
    pending: number;
  };

  const stats: ProjectStats = projectsData.reduce(
    (acc: ProjectStats, project: Project) => {
      acc.activeProjects += project.status === "Activo" ? 1 : 0;
      acc.completedTasks += project.completedTasks;
      acc.inProgress += project.tasksCount - project.completedTasks;
      acc.pending += project.status === "Pendiente" ? 1 : 0;
      return acc;
    },
    {
      activeProjects: 0,
      completedTasks: 0,
      inProgress: 0,
      pending: 0,
    }
  );

  const filteredProjects = useMemo(() => {
    let filtered = projectsData;

    // Filtrar por estado
    if (activeFilter !== "Todos") {
      filtered = filtered.filter(project => project.status === activeFilter);
    }

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(
        (project) =>
          project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          project.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [searchTerm, activeFilter]);

  return (
    <div className="min-h-screen bg-background p-6 space-y-6">
      {/* Header con búsqueda y filtros */}
      <div className="bg-card rounded-lg p-6 shadow-sm border">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          {/* Barra de búsqueda */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              className="pl-10" 
              placeholder="Buscar proyectos..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filtros */}
          <div className="flex gap-2 flex-wrap">
            {["Todos", "Activo", "Completado", "Pendiente"].map((filter) => (
              <Button 
                key={filter}
                variant={activeFilter === filter ? "default" : "outline"} 
                size="sm" 
                className="min-w-20"
                onClick={() => setActiveFilter(filter)}
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
          value={stats.activeProjects}
          icon={<Calendar className="w-5 h-5" />}
        />
        <DashboardCard
          title="Tareas Completadas"
          value={stats.completedTasks}
          icon={<Check className="w-5 h-5" />}
        />
        <DashboardCard
          title="En Progreso"
          value={stats.inProgress}
          icon={<Timer className="w-5 h-5" />}
        />
        <DashboardCard
          title="Pendientes"
          value={stats.pending}
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
            <Button variant="default" size="sm" className="shrink-0">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo proyecto
            </Button>
          </div>

          {/* Grid de proyectos */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {
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
              ))}
            
          </div>

          {/* Estado vacío */}
          {filteredProjects.length === 0 && (
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
