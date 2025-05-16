
import { Task } from "@/types/task";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface TaskCardProps {
  task: Task;
  onClick: (task: Task) => void;
}

export function TaskCard({ task, onClick }: TaskCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-task-high text-white";
      case "medium":
        return "bg-task-medium text-white";
      case "low":
        return "bg-task-low text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "todo":
        return "bg-gray-200 text-gray-800";
      case "in-progress":
        return "bg-blue-500 text-white";
      case "review":
        return "bg-yellow-500 text-white";
      case "done":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <Card 
      className="hover:shadow-md transition-all cursor-pointer animate-fade-in" 
      onClick={() => onClick(task)}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{task.title}</CardTitle>
          <Badge className={getPriorityColor(task.priority)}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </Badge>
        </div>
        <CardDescription className="text-sm text-gray-500">
          Category: {task.category}
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-gray-700 line-clamp-2">{task.description}</p>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between items-center">
        <span className="text-xs text-gray-500">
          {format(task.createdAt, "MMM d, yyyy")}
        </span>
        <Badge variant="outline" className={getStatusBadge(task.status)}>
          {task.status.replace("-", " ")}
        </Badge>
      </CardFooter>
    </Card>
  );
}
