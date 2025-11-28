import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../../components/ui/AppHeader';
import TodoInput from './components/TodoInput';
import FilterTabs from './components/FilterTabs';
import TodoList from './components/TodoList';
import TodoStats from './components/TodoStats';
import FloatingActionButton from './components/FloatingActionButton';
import TaskCreationModal from '../../components/ui/TaskCreationModal';
import FilterSearchPanel from '../../components/ui/FilterSearchPanel';
import Button from '../../components/ui/Button';
import TaskService from "../../services/TaskService";


const MainTodoDashboard = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [filteredTodos, setFilteredTodos] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    priority: [],
    category: [],
    status: [],
    dateRange: '',
    tags: []
  });


  // Save todos to localStorage whenever todos change
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todomaster-todos', JSON.stringify(todos));
    }
  }, [todos]);

  useEffect(() => {
    const fetchTasks = async () =>{
      try {
        const taskList = await TaskService.getAll();
        setTodos(taskList);
        console.log(taskList);
      }catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }

     fetchTasks()
  }, []);

  // Filter and search todos
  useEffect(() => {
    let filtered = [...todos];

    // Apply status filter
    switch (activeFilter) {
      case 'active':
        filtered = filtered.filter(todo => !todo.completed);
        break;
      case 'completed':
        filtered = filtered.filter(todo => todo.completed);
        break;
      default:
        break;
    }



    // Apply search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(todo =>
        todo.title.toLowerCase().includes(query) ||
        todo.description?.toLowerCase().includes(query) ||
        todo.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Apply advanced filters
    if (filters.priority.length > 0) {
      filtered = filtered.filter(todo => filters.priority.includes(todo.priority));
    }

    if (filters.category.length > 0) {
      filtered = filtered.filter(todo => filters.category.includes(todo.category));
    }

    if (filters.status.length > 0) {
      filtered = filtered.filter(todo => {
        if (filters.status.includes('pending') && !todo.completed) return true;
        if (filters.status.includes('completed') && todo.completed) return true;
        if (filters.status.includes('overdue') && isOverdue(todo.dueDate) && !todo.completed) return true;
        return false;
      });
    }

    if (filters.dateRange) {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      filtered = filtered.filter(todo => {
        if (!todo.dueDate) return filters.dateRange === '';
        const dueDate = new Date(todo.dueDate);

        switch (filters.dateRange) {
          case 'today':
            return dueDate.toDateString() === today.toDateString();
          case 'tomorrow':
            return dueDate.toDateString() === tomorrow.toDateString();
          case 'this-week':
            const weekStart = new Date(today);
            weekStart.setDate(today.getDate() - today.getDay());
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekStart.getDate() + 6);
            return dueDate >= weekStart && dueDate <= weekEnd;
          case 'overdue':
            return dueDate < today && !todo.completed;
          default:
            return true;
        }
      });
    }

    if (filters.tags.length > 0) {
      filtered = filtered.filter(todo =>
        todo.tags?.some(tag =>
          filters.tags.some(filterTag =>
            tag.toLowerCase().includes(filterTag.toLowerCase())
          )
        )
      );
    }

    setFilteredTodos(filtered);
  }, [todos, activeFilter, searchQuery, filters]);

  const isOverdue = (dateString) => {
    if (!dateString) return false;
    const dueDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate < today;
  };

  const getTodoCounts = () => {
    return {
      all: todos.length,
      active: todos.filter(todo => !todo.completed).length,
      completed: todos.filter(todo => todo.completed).length
    };
  };

  const parseTaskInput = (input) => {
    let title = input;
    let priority = 'medium';
    let category = '';
    let tags = [];
    let dueDate = '';

    // Extract priority (!high, !urgent, !low, !medium)
    const priorityMatch = input.match(/!(high|urgent|low|medium)/i);
    if (priorityMatch) {
      priority = priorityMatch[1].toLowerCase();
      title = title.replace(priorityMatch[0], '').trim();
    }

    // Extract category (@work, @personal, etc.)
    const categoryMatch = input.match(/@(\w+)/i);
    if (categoryMatch) {
      category = categoryMatch[1].toLowerCase();
      title = title.replace(categoryMatch[0], '').trim();
    }

    // Extract tags (#tag1, #tag2)
    const tagMatches = input.match(/#(\w+)/g);
    if (tagMatches) {
      tags = tagMatches.map(tag => tag.substring(1).toLowerCase());
      tagMatches.forEach(tag => {
        title = title.replace(tag, '').trim();
      });
    }

    // Extract due date (due:YYYY-MM-DD)
    const dueDateMatch = input.match(/due:(\d{4}-\d{2}-\d{2})/i);
    if (dueDateMatch) {
      dueDate = dueDateMatch[1];
      title = title.replace(dueDateMatch[0], '').trim();
    }

    return { title, priority, category, tags, dueDate };
  };

  const handleAddTodo = async (input) => {
    setIsLoading(true);
    try {
      const parsed = parseTaskInput(input);
      const newTodo = {
        id: Date.now(),
        title: parsed.title,
        description: '',
        completed: false,
        priority: parsed.priority,
        category: parsed.category,
        dueDate: parsed.dueDate,
        tags: parsed.tags,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      setTodos(prev => [newTodo, ...prev]);
    } catch (error) {
      console.error('Error adding todo:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleTodo = (uuid) => {
    const updatedTodo = todos.find(todo => todo.uuid === uuid);
    if (!updatedTodo) return;

    const toggledTodo = {
      ...updatedTodo,
      completed: !updatedTodo.completed,
      updatedAt: new Date().toISOString(),
    };

    setTodos(prev =>
        prev.map(todo =>
            todo.uuid === uuid ? toggledTodo : todo
        )
    );

    TaskService.updateByUuid(toggledTodo)
        .then(() => console.log('Todo updated on backend'))
        .catch(err => console.error('Update failed', err));

  };

  const handleEditTodo = (todo) => {
    setEditingTask(todo);
    setIsTaskModalOpen(true);
  };

  const handleDeleteTodo = async (uuid) =>  {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await TaskService.deleteByUuid(uuid);
        setTodos(prevTodos => prevTodos.filter(todo => todo.uuid !== uuid));
      } catch (error) {
        console.error("Error deleting task:", error);
      }
    }
  };

  const handleSaveTask = (taskData) => {
    if (editingTask) {
      setTodos(prev =>
        prev.map(todo =>
          todo.id === editingTask.id ? { ...taskData, id: editingTask.id } : todo
        )
      );
    } else {
      setTodos(prev => [taskData, ...prev]);
    }
    setEditingTask(null);
  };

  const handleClearCompleted = () => {
    if (window.confirm('Are you sure you want to clear all completed tasks?')) {
      setTodos(prev => prev.filter(todo => !todo.completed));
    }
  };

  const handleToggleAll = () => {
    const hasActiveTodos = todos.some(todo => !todo.completed);
    setTodos(prev =>
      prev.map(todo => ({
        ...todo,
        completed: hasActiveTodos,
        updatedAt: new Date().toISOString()
      }))
    );
  };

  const handleReorderTodos = (newTodos) => {
    setTodos(newTodos);
  };

  const handleOpenTaskModal = () => {
    setEditingTask(null);
    setIsTaskModalOpen(true);
  };

  const handleCloseTaskModal = async () => {
    setIsTaskModalOpen(false);
    try {
      const tasks = await TaskService.getAll();
      setTodos(tasks);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
    setEditingTask(null);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const todoCounts = getTodoCounts();
  const hasActiveTodos = todos.some(todo => !todo.completed);

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      
      <main className="pt-16 pb-20 sm:pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="py-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                My Tasks
              </h1>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setIsFilterPanelOpen(true)}
                  className="relative"
                  iconName="Filter"
                  iconSize={18}
                >
                  {(filters.priority.length > 0 || filters.category.length > 0 || filters.status.length > 0 || filters.dateRange || filters.tags.length > 0) && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
                  )}
                </Button>
                <Button
                  variant="default"
                  onClick={handleOpenTaskModal}
                  className="hidden sm:flex"
                  iconName="Plus"
                  iconPosition="left"
                  iconSize={16}
                >
                  Add Task
                </Button>
              </div>
            </div>
            <p className="text-muted-foreground">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>

          {/* Quick Add Input */}
          <TodoInput onAddTodo={handleAddTodo} isLoading={isLoading} />

          {/* Filter Tabs */}
          <FilterTabs
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
            todoCounts={todoCounts}
          />

          {/* Todo List */}
          <TodoList
            todos={filteredTodos}
            onToggleTodo={handleToggleTodo}
            onEditTodo={handleEditTodo}
            onDeleteTodo={handleDeleteTodo}
            onReorderTodos={handleReorderTodos}
          />

          {/* Stats and Actions */}
          <TodoStats
            todoCounts={todoCounts}
            onClearCompleted={handleClearCompleted}
            onToggleAll={handleToggleAll}
            hasActiveTodos={hasActiveTodos}
          />
        </div>
      </main>

      {/* Floating Action Button */}
      <FloatingActionButton onClick={handleOpenTaskModal} />

      {/* Task Creation/Edit Modal */}
      <TaskCreationModal
        isOpen={isTaskModalOpen}
        onClose={handleCloseTaskModal}
        task={editingTask}
        onSave={handleSaveTask}
      />

      {/* Filter Search Panel */}
      <FilterSearchPanel
        isOpen={isFilterPanelOpen}
        onClose={() => setIsFilterPanelOpen(false)}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onSearch={handleSearch}
      />
    </div>
  );
};

export default MainTodoDashboard;