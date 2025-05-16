
import { Progress } from "@/components/ui/progress";
import { Task, TaskStatus } from "@/types/task";

interface TaskProgressProps {
  tasks: Task[];
}

export function TaskProgress({ tasks }: TaskProgressProps) {
  // Calculate statistics
  const total = tasks.length;
  
  const getTasksByStatus = (status: TaskStatus): number => {
    return tasks.filter(task => task.status === status).length;
  };
  
  const todoCount = getTasksByStatus('todo');
  const inProgressCount = getTasksByStatus('in-progress');
  const reviewCount = getTasksByStatus('review');
  const doneCount = getTasksByStatus('done');
  
  const completionPercentage = total > 0 ? Math.round((doneCount / total) * 100) : 0;
  const inProgressPercentage = total > 0 ? Math.round(((inProgressCount + reviewCount) / total) * 100) : 0;

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">Project Progress</h2>
        <span className="font-medium text-lg">{completionPercentage}%</span>
      </div>
      <Progress value={completionPercentage} className="h-2 mb-4" />
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <div className="bg-gray-100 p-3 rounded">
          <p className="text-sm text-gray-600">To Do</p>
          <p className="text-xl font-semibold">{todoCount}</p>
        </div>
        <div className="bg-blue-50 p-3 rounded">
          <p className="text-sm text-blue-600">In Progress</p>
          <p className="text-xl font-semibold">{inProgressCount}</p>
        </div>
        <div className="bg-yellow-50 p-3 rounded">
          <p className="text-sm text-yellow-600">Under Review</p>
          <p className="text-xl font-semibold">{reviewCount}</p>
        </div>
        <div className="bg-green-50 p-3 rounded">
          <p className="text-sm text-green-600">Completed</p>
          <p className="text-xl font-semibold">{doneCount}</p>
        </div>
      </div>
    </div>
  );
}
