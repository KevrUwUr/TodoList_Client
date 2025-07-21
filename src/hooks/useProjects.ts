import { useState, useEffect } from 'react';

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

// Configuration - Configura estos valores según tu backend
const API_CONFIG = {
  // Cambiar por la URL de tu backend
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
  
  // Endpoints de la API
  ENDPOINTS: {
    PROJECTS: '/projects',
    PROJECTS_STATS: '/projects/stats'
  },
  
  // Headers por defecto (agregar autenticación si es necesario)
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    // Descomenta y configura si necesitas autenticación
    // 'Authorization': `Bearer ${token}`
  }
};

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [stats, setStats] = useState<ProjectStats>({
    activeProjects: 0,
    completedTasks: 0,
    inProgress: 0,
    pending: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const MOCK_MODE = true;

  // Función para obtener proyectos
  const fetchProjects = async () => {
  try {
    setLoading(true);
    setError(null);

    if (MOCK_MODE) {
      throw new Error("Modo de prueba activado");
    }

    const response = await fetch(
      `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PROJECTS}`,
      {
        method: 'GET',
        headers: API_CONFIG.DEFAULT_HEADERS,
      }
    );

    if (!response.ok) {
      throw new Error(`Error al obtener proyectos: ${response.status}`);
    }

    const data = await response.json();
    const mappedProjects: Project[] = data.map((project: Project) => ({
      id: project.id,
      name: project.name || project.title,
      status: project.status,
      description: project.description,
      tasksCount: project.tasks_count || project.tasksCount || 0,
      completedTasks: project.completed_tasks || project.completedTasks || 0,
      dueDate: project.due_date || project.dueDate,
      createdAt: project.created_at || project.createdAt,
      updatedAt: project.updated_at || project.updatedAt
    }));

    setProjects(mappedProjects);
  } catch (err) {
    console.error('Error fetching projects:', err);
    setError(err instanceof Error ? err.message : 'Error desconocido');

    // Datos de prueba que ya tienes definidos
    setProjects([
        {
          id: 1,
          name: "Sistema de Gestión Empresarial",
          status: "Activo",
          description: "Sistema completo de gestión empresarial con dashboard interactivo, reportes en tiempo real y módulos de CRM",
          tasksCount: 32,
          completedTasks: 24,
          dueDate: "28/02/2025",
          createdAt: "2024-11-15",
          updatedAt: "2025-01-20"
        },
        {
          id: 2,
          name: "App Mobile TodoList Pro",
          status: "Activo",
          description: "Aplicación móvil avanzada para gestión de tareas con sincronización en la nube y notificaciones inteligentes",
          tasksCount: 18,
          completedTasks: 12,
          dueDate: "15/03/2025",
          createdAt: "2024-12-01",
          updatedAt: "2025-01-18"
        },
        {
          id: 3,
          name: "E-commerce Marketplace",
          status: "Completado",
          description: "Plataforma de comercio electrónico multivendedor con sistema de pagos, inventario y análisis de ventas",
          tasksCount: 45,
          completedTasks: 45,
          dueDate: "15/01/2025",
          createdAt: "2024-09-01",
          updatedAt: "2025-01-15"
        },
        {
          id: 4,
          name: "Dashboard Analytics",
          status: "Activo",
          description: "Dashboard de análisis de datos con visualizaciones interactivas y reportes automatizados para empresas",
          tasksCount: 22,
          completedTasks: 15,
          dueDate: "10/04/2025",
          createdAt: "2024-12-10",
          updatedAt: "2025-01-19"
        },
        {
          id: 5,
          name: "API REST Microservicios",
          status: "Activo",
          description: "Arquitectura de microservicios con API REST, autenticación JWT y documentación completa con Swagger",
          tasksCount: 28,
          completedTasks: 8,
          dueDate: "20/05/2025",
          createdAt: "2024-12-20",
          updatedAt: "2025-01-21"
        },
        {
          id: 6,
          name: "Sistema de Inventario",
          status: "Pendiente",
          description: "Sistema web para control de inventario con códigos de barras, alertas de stock y reportes de movimientos",
          tasksCount: 35,
          completedTasks: 5,
          dueDate: "30/06/2025",
          createdAt: "2025-01-05",
          updatedAt: "2025-01-21"
        },
        {
          id: 7,
          name: "Chatbot IA Soporte",
          status: "Activo",
          description: "Chatbot inteligente para atención al cliente con procesamiento de lenguaje natural y integración con CRM",
          tasksCount: 20,
          completedTasks: 14,
          dueDate: "25/04/2025",
          createdAt: "2024-11-30",
          updatedAt: "2025-01-20"
        },
        {
          id: 8,
          name: "Plataforma de Streaming",
          status: "Completado",
          description: "Plataforma de video streaming con reproductor personalizado, sistema de suscripciones y analytics",
          tasksCount: 38,
          completedTasks: 38,
          dueDate: "20/12/2024",
          createdAt: "2024-08-15",
          updatedAt: "2024-12-20"
        },
        {
          id: 9,
          name: "App de Fitness y Salud",
          status: "Activo",
          description: "Aplicación móvil para seguimiento de ejercicios, nutrición y métricas de salud con gamificación",
          tasksCount: 26,
          completedTasks: 19,
          dueDate: "15/05/2025",
          createdAt: "2024-10-01",
          updatedAt: "2025-01-19"
        },
        {
          id: 10,
          name: "Sistema de Reservas Online",
          status: "Pendiente",
          description: "Sistema web para reservas de servicios con calendario interactivo, pagos online y gestión de clientes",
          tasksCount: 30,
          completedTasks: 3,
          dueDate: "01/08/2025",
          createdAt: "2025-01-10",
          updatedAt: "2025-01-21"
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener estadísticas
  const fetchStats = async () => {
    try {
      const response = await fetch(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PROJECTS_STATS}`,
        {
          method: 'GET',
          headers: API_CONFIG.DEFAULT_HEADERS,
        }
      );

      if (!response.ok) {
        // Si no hay endpoint de stats, calcular desde los proyectos
        calculateStatsFromProjects();
        return;
      }

      const data = await response.json();
      setStats({
        activeProjects: data.active_projects || data.activeProjects || 0,
        completedTasks: data.completed_tasks || data.completedTasks || 0,
        inProgress: data.in_progress || data.inProgress || 0,
        pending: data.pending || data.pending || 0
      });
    } catch (err) {
      console.error('Error fetching stats:', err);
      calculateStatsFromProjects();
    }
  };

  // Calcular estadísticas desde los proyectos locales si no hay endpoint de stats
  const calculateStatsFromProjects = () => {
    const activeProjects = projects.filter(p => p.status === 'Activo').length;
    const completedTasks = projects.reduce((acc, p) => acc + p.completedTasks, 0);
    const inProgress = projects.reduce((acc, p) => acc + (p.tasksCount - p.completedTasks), 0);
    const pending = projects.filter(p => p.status === 'Pendiente').length;

    setStats({
      activeProjects,
      completedTasks,
      inProgress,
      pending
    });
  };

  // Función para crear un nuevo proyecto
  const createProject = async (projectData: Omit<Project, 'id'>) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PROJECTS}`,
        {
          method: 'POST',
          headers: API_CONFIG.DEFAULT_HEADERS,
          body: JSON.stringify(projectData)
        }
      );

      if (!response.ok) {
        throw new Error(`Error al crear proyecto: ${response.status}`);
      }

      const newProject = await response.json();
      setProjects(prev => [...prev, newProject]);
      
      // Refrescar estadísticas
      await fetchStats();
      
      return newProject;
    } catch (err) {
      console.error('Error creating project:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Función para actualizar un proyecto
  const updateProject = async (id: number, projectData: Partial<Project>) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PROJECTS}/${id}`,
        {
          method: 'PUT',
          headers: API_CONFIG.DEFAULT_HEADERS,
          body: JSON.stringify(projectData)
        }
      );

      if (!response.ok) {
        throw new Error(`Error al actualizar proyecto: ${response.status}`);
      }

      const updatedProject = await response.json();
      setProjects(prev => 
        prev.map(p => p.id === id ? { ...p, ...updatedProject } : p)
      );
      
      return updatedProject;
    } catch (err) {
      console.error('Error updating project:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Función para eliminar un proyecto
  const deleteProject = async (id: number) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PROJECTS}/${id}`,
        {
          method: 'DELETE',
          headers: API_CONFIG.DEFAULT_HEADERS,
        }
      );

      if (!response.ok) {
        throw new Error(`Error al eliminar proyecto: ${response.status}`);
      }

      setProjects(prev => prev.filter(p => p.id !== id));
      
      // Refrescar estadísticas
      await fetchStats();
    } catch (err) {
      console.error('Error deleting project:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Effect para cargar datos al montar el componente
  useEffect(() => {
    fetchProjects();
  }, []);

  // Effect para calcular/cargar estadísticas cuando cambien los proyectos
  useEffect(() => {
    if (projects.length > 0) {
      fetchStats();
    }
  }, [projects]);

  return {
    projects,
    stats,
    loading,
    error,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject,
    refreshData: () => {
      fetchProjects();
      fetchStats();
    }
  };
};
