import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, Plus, CheckSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Task {
  id: number;
  text: string;
}

export function TodoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState("");
  const { toast } = useToast();

  const addTask = () => {
    if (inputValue.trim() !== "") {
      const newTask = {
        id: Date.now(),
        text: inputValue.trim(),
      };
      setTasks([...tasks, newTask]);
      setInputValue("");
      toast({
        title: "Task added!",
        description: "Your new task has been added to the list.",
      });
    }
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
    toast({
      title: "Task deleted",
      description: "Task has been removed from your list.",
      variant: "destructive",
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-background p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-primary rounded-xl shadow-medium">
              <CheckSquare className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Todo List
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Stay organized and get things done
          </p>
        </div>

        {/* Add Task Section */}
        <Card className="mb-8 shadow-medium border-0">
          <CardContent className="p-6">
            <div className="flex gap-3">
              <Input
                type="text"
                placeholder="Add a new task..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 h-12 text-lg border-0 shadow-soft focus:ring-2 focus:ring-primary"
              />
              <Button 
                onClick={addTask}
                className="h-12 px-6 bg-gradient-primary hover:shadow-medium transition-all duration-200 border-0"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Tasks List */}
        <div className="space-y-3">
          {tasks.length === 0 ? (
            <Card className="shadow-soft border-0">
              <CardContent className="p-8 text-center">
                <div className="mb-4">
                  <CheckSquare className="h-16 w-16 mx-auto text-muted-foreground/30" />
                </div>
                <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                  No tasks yet
                </h3>
                <p className="text-muted-foreground">
                  Add your first task above to get started!
                </p>
              </CardContent>
            </Card>
          ) : (
            tasks.map((task) => (
              <Card 
                key={task.id} 
                className="shadow-soft border-0 hover:shadow-medium transition-all duration-200"
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-lg text-foreground flex-1">
                      {task.text}
                    </span>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteTask(task.id)}
                      className="ml-4 h-10 px-4 hover:shadow-soft transition-all duration-200"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Task Counter */}
        {tasks.length > 0 && (
          <div className="mt-8 text-center">
            <p className="text-muted-foreground">
              {tasks.length} {tasks.length === 1 ? "task" : "tasks"} remaining
            </p>
          </div>
        )}
      </div>
    </div>
  );
}