
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onNewTask: () => void;
}

export function Header({ onNewTask }: HeaderProps) {
  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Pixel Task Mastermind</h1>
            <p className="mt-1 text-sm text-gray-500">
              3D Image Processing App Development Tasks
            </p>
          </div>
          <div>
            <Button onClick={onNewTask}>
              Add New Task
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
