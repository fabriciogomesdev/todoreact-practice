import { useEffect, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form";
import "./styles.css"
import { Check, CirclePlus, Trash2 } from "lucide-react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

export default function Tasks() {
  interface Task {
    id: string;
    taskDescription: string;
    checked: boolean;
    
  }

  const { register, handleSubmit, reset } = useForm();
  const [list, setList] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [pendingTasks, setPendingTasks] = useState<Task[]>([]);
  const [pendingDeletes, setPendingDeletes] = useState<Task[]>([]);

  async function loadAllTasks() {
    try {
      const response = await axios.get<Task[]>("http://localhost:3000/tasks");
      
      setTasks(response.data)
    } catch (error) {
      console.log(error)

    }
  }

  const handlePost = async (task: Task) => {
    try {
      const response = await axios.post("http://localhost:3000/tasks", task);
      

      
      if (pendingTasks.length > 0) {
        await retryPendingTasks();
      }
    } catch (error) {
      console.error("Erro ao enviar a tarefa:", error);

      
      setPendingTasks((prev) => {
        const updatedPending = [...prev, task];
        
        return updatedPending;
      });
    }
  };

  const handleDeleteRequest = async ( task: Task) => {
    const failedDeletes = []
      try {
        const response = await axios.delete(`http://localhost:3000/tasks/${task.id}`);
        

        if (pendingDeletes.length > 0) {
          await retryDeletingTasks();
        }

      } catch (error) {

        console.error("erro", error);
        failedDeletes.push(task);

      }
    
    setPendingDeletes(failedDeletes);
  }

  const retryDeletingTasks = async () => {
    
    
    for (const tasks of pendingDeletes) {
      await axios.delete(`http://localhost:3000/tasks/${tasks.id}`);
      
    }
  }

  const retryPendingTasks = async () => {
    

    const failedTasks: Task[] = [];
    for (const task of pendingTasks) {
      try {
        await axios.post("http://localhost:3000/tasks", task);
        console.log("Tarefa pendente enviada com sucesso:", task);
      } catch (error) {
        console.error("Erro ao tentar reenviar a tarefa:", error);
        failedTasks.push(task); 
      }
    }
    setPendingTasks(failedTasks);
  };

  useEffect(() => {
    if (list) {
      setTasks((prevTasks) => [...prevTasks, list]);
      handlePost(list);
    }
  }, [list]);

  useEffect(() => {
    loadAllTasks();
  }, [])

  const handleToggleCheck = (index: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, idx) =>
        idx === index ? { ...task, checked: !task.checked } : task
      )
    );
  };

  const handleDelete = (task: Task, index: number) => {
    setTasks((prevTasks) => prevTasks.filter((_, idx) => idx !== index));
    
    handleDeleteRequest(task);
  };



  return (
    <div className="tasks">
      <form
        className="task-form"
        onSubmit={handleSubmit((data) => {
          const newTask = {
            taskDescription: data.taskDescription,
            checked: false,
            id: uuidv4()
          };
          setList(newTask);
          reset();
          
        })}
      >
        <input
          {...register("taskDescription", { required: true })}
          placeholder="Adicione uma nova tarefa"
          className="new-task"
        />
        <button type="submit" className="create">
          Criar
        </button>
      </form>

      <div>
        <div className="menu">
          <div className="tasks-count">
            Tarefas criadas <div className="tasks-count-number">{tasks.length}</div>
          </div>
          <div className="concluded-tasks">
            Concluídas
            <div className="concluded-tasks-counter">
              {tasks.length === 0
                ? "0"
                : `${tasks.filter((task) => task.checked).length} de ${tasks.length}`}
            </div>
          </div>
        </div>
        <div className="tasks-display">
          {tasks.length === 0 ? (
            <div className="no-tasks">
              <img src="src/assets/Clipboard.png" alt="Sem tarefas" />
              <p className="no-tasks-message">
                Você ainda não tem tarefas cadastradas.
              </p>
              <p className="no-tasks-message-two">
                Crie tarefas e organize seus itens a fazer.
              </p>
            </div>
          ) : (
            <ul>
              {tasks.map((task, index) => (
                <li key={index}>
                  <div className={`task-container`}>
                    <div className="task-content">
                      <input
                        type="checkbox"
                        checked={task.checked}
                        onChange={() => handleToggleCheck(index)}
                        className="checker"
                      />
                      <span
                        className={`task-description ${task.checked ? "checked" : "unchecked"
                          }`}
                      >
                        {task.taskDescription}
                      </span>
                    </div>
                    <button
                      className="delete"
                      onClick={() => handleDelete(task, index)}
                    >
                      <Trash2 />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}