
import { useState, useEffect } from "react";
import { tasks as initialTasks } from "@/data/tasks";
import { Task } from "@/types/task";
import { TaskCard } from "@/components/TaskCard";
import { TaskDetail } from "@/components/TaskDetail";
import { TaskFilter, FilterOptions } from "@/components/TaskFilter";
import { TaskProgress } from "@/components/TaskProgress";
import { Header } from "@/components/Header";
import { TaskCreationDialog } from "@/components/TaskCreationDialog";
import { v4 as uuidv4 } from "uuid";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filteredTasks, setFilteredTasks] = useState<Task[]>(initialTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState<boolean>(false);
  const [isCreationOpen, setIsCreationOpen] = useState<boolean>(false);
  const { toast } = useToast();

  // Apply filters whenever tasks or filter options change
  const handleFilterChange = (filters: FilterOptions) => {
    let filtered = [...tasks];

    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filtered = filtered.filter(
        task => 
          task.title.toLowerCase().includes(searchLower) ||
          task.description.toLowerCase().includes(searchLower)
      );
    }

    // Apply priority filter
    if (filters.priority !== "all") {
      filtered = filtered.filter(task => task.priority === filters.priority);
    }

    // Apply status filter
    if (filters.status !== "all") {
      filtered = filtered.filter(task => task.status === filters.status);
    }

    // Apply category filter
    if (filters.category !== "all") {
      filtered = filtered.filter(task => task.category === filters.category);
    }

    setFilteredTasks(filtered);
  };

  // Handle task selection for viewing/editing
  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsDetailOpen(true);
  };

  // Handle task update
  const handleTaskUpdate = (updatedTask: Task) => {
    const updatedTasks = tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    setFilteredTasks(
      filteredTasks.map(task => 
        task.id === updatedTask.id ? updatedTask : task
      )
    );
    toast({
      title: "Task updated",
      description: `${updatedTask.title} has been updated.`,
    });
  };

  // Handle task creation
  const handleTaskCreate = (taskData: Omit<Task, "id" | "createdAt" | "updatedAt">) => {
    const now = new Date();
    const newTask: Task = {
      ...taskData,
      id: uuidv4(),
      createdAt: now,
      updatedAt: now
    };
    
    const updatedTasks = [newTask, ...tasks];
    setTasks(updatedTasks);
    setFilteredTasks([newTask, ...filteredTasks]);
    toast({
      title: "Task created",
      description: `${newTask.title} has been added to your tasks.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onNewTask={() => setIsCreationOpen(true)} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TaskProgress tasks={tasks} />
        <TaskFilter onFilterChange={handleFilterChange} />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onClick={handleTaskClick}
            />
          ))}
          {filteredTasks.length === 0 && (
            <div className="col-span-3 text-center py-10">
              <p className="text-gray-500 text-lg">No tasks match your filters</p>
            </div>
          )}
        </div>
      </main>
      
      <TaskDetail
        task={selectedTask}
        open={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onUpdate={handleTaskUpdate}
      />
      
      <TaskCreationDialog
        open={isCreationOpen}
        onClose={() => setIsCreationOpen(false)}
        onSave={handleTaskCreate}
      />
    </div>
  );
};

export default Index;
