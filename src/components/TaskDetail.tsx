
import { useState } from "react";
import { Task, TaskPriority, TaskStatus } from "@/types/task";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { useToast } from "@/components/ui/use-toast";

interface TaskDetailProps {
  task: Task | null;
  open: boolean;
  onClose: () => void;
  onUpdate: (task: Task) => void;
}

export function TaskDetail({ task, open, onClose, onUpdate }: TaskDetailProps) {
  const [editedTask, setEditedTask] = useState<Task | null>(task);
  const { toast } = useToast();

  // Update local state when task changes
  if (task && (!editedTask || task.id !== editedTask.id)) {
    setEditedTask(task);
  }

  if (!editedTask) return null;

  const handleChange = <K extends keyof Task>(key: K, value: Task[K]) => {
    setEditedTask({ ...editedTask, [key]: value, updatedAt: new Date() });
  };

  const handleSave = () => {
    onUpdate(editedTask);
    toast({
      title: "Task updated",
      description: "The task has been updated successfully.",
    });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Task Details</DialogTitle>
          <DialogDescription>
            View and edit task information
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={editedTask.title}
              onChange={(e) => handleChange("title", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              value={editedTask.description}
              onChange={(e) => handleChange("description", e.target.value)}
              className="col-span-3"
              rows={5}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="priority" className="text-right">
              Priority
            </Label>
            <Select
              value={editedTask.priority}
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
              value={editedTask.status}
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
            <Input
              id="category"
              value={editedTask.category}
              onChange={(e) => handleChange("category", e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Created</Label>
            <span className="col-span-3 text-sm text-gray-500">
              {format(new Date(editedTask.createdAt), "PPpp")}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Updated</Label>
            <span className="col-span-3 text-sm text-gray-500">
              {format(new Date(editedTask.updatedAt), "PPpp")}
            </span>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
