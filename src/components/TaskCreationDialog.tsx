
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TaskPriority, TaskStatus } from "@/types/task";
import { useToast } from "@/components/ui/use-toast";

interface TaskCreationDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (taskData: Omit<TaskData, "id" | "createdAt" | "updatedAt">) => void;
}

interface TaskData {
  title: string;
  description: string;
  priority: TaskPriority;
  status: TaskStatus;
  category: string;
}

export function TaskCreationDialog({ open, onClose, onSave }: TaskCreationDialogProps) {
  const [taskData, setTaskData] = useState<TaskData>({
    title: "",
    description: "",
    priority: "medium",
    status: "todo",
    category: "Core Feature",
  });

  const { toast } = useToast();

  const handleChange = <K extends keyof TaskData>(key: K, value: TaskData[K]) => {
    setTaskData({ ...taskData, [key]: value });
  };

  const handleSubmit = () => {
    if (!taskData.title) {
      toast({
        title: "Error",
        description: "Task title is required",
        variant: "destructive",
      });
      return;
    }

    onSave(taskData);
    setTaskData({
      title: "",
      description: "",
      priority: "medium",
      status: "todo",
      category: "Core Feature",
    });
    toast({
      title: "Task created",
      description: "New task has been added successfully.",
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
          <DialogDescription>
            Add a new task to your project.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={taskData.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="col-span-3"
              placeholder="Enter task title"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              value={taskData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="col-span-3"
              placeholder="Enter task description"
              rows={5}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="priority" className="text-right">
              Priority
            </Label>
            <Select
              value={taskData.priority}
              onValueChange={(value) => handleChange("priority", value as TaskPriority)}
            >
              <SelectTrigger className="col-span-3" id="priority">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select
              value={taskData.status}
              onValueChange={(value) => handleChange("status", value as TaskStatus)}
            >
              <SelectTrigger className="col-span-3" id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todo">To Do</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="review">Review</SelectItem>
                <SelectItem value="done">Done</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Select
              value={taskData.category}
              onValueChange={(value) => handleChange("category", value)}
            >
              <SelectTrigger className="col-span-3" id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Setup">Setup</SelectItem>
                <SelectItem value="Core Feature">Core Feature</SelectItem>
                <SelectItem value="Enhancement">Enhancement</SelectItem>
                <SelectItem value="Collaboration">Collaboration</SelectItem>
                <SelectItem value="User Experience">User Experience</SelectItem>
                <SelectItem value="Security">Security</SelectItem>
                <SelectItem value="Monitoring">Monitoring</SelectItem>
                <SelectItem value="Architecture">Architecture</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Create Task</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
