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
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
  
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

  // Función para obtener proyectos
  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);

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
      
      // Mapear los datos de la API al formato esperado por el frontend
      const mappedProjects: Project[] = data.map((project: any) => ({
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
      
      // Datos de fallback para desarrollo/testing
      setProjects([
        {
          id: 1,
          name: "Sistema de Gestión",
          status: "Activo",
          description: "Sistema completo de gestión empresarial con dashboard y reportes",
          tasksCount: 25,
          completedTasks: 18,
          dueDate: "28/01/2025"
        },
        {
          id: 2,
          name: "App Mobile ToDo",
          status: "Activo",
          description: "Aplicación móvil para gestión de tareas personales",
          tasksCount: 15,
          completedTasks: 8,
          dueDate: "15/02/2025"
        },
        {
          id: 3,
          name: "E-commerce Platform",
          status: "Completado",
          description: "Plataforma de comercio electrónico con pagos integrados",
          tasksCount: 40,
          completedTasks: 40,
          dueDate: "10/01/2025"
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
