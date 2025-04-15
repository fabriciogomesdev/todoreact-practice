import { useEffect, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form";
import "./styles.css"
import { Check, CirclePlus, Trash2 } from "lucide-react";
export default function Tasks() {

    interface Task extends Object {
        taskDescription: string;
        checked: boolean;
    }

    const { register, handleSubmit, reset } = useForm();
    const [list, setList] = useState<Task | null>(null)
    const [tasks, setTasks] = useState<Task[]>([])




    useEffect(() => {

        if (list) {
            setTasks(prevTasks => [...prevTasks, list]);
        }


    }, [list])

    const handleToggleCheck = (indexChecker: Number) => {
        setTasks(prevTasks =>
            prevTasks.map((task, index) =>
                index === indexChecker
                    ? { ...task, checked: !task.checked }
                    : task
            ))
    }

    const handleDelete = (indexChecker: Number) => {
        setTasks(prevTasks => prevTasks.filter((_, index) => index !== indexChecker))
    }

    return (
        <div className="tasks">
            <form
                className="task-form"
                onSubmit={handleSubmit((data) => {
                    const newTask = {
                        taskDescription: data.taskDescription,
                        checked: false
                    }
                    setList(newTask);
                    reset();
                })}
            >
                <input {...register("taskDescription", { required: true })} placeholder="Adicione uma nova tarefa" className="new-task" />
                <button type="submit" className="create">
                    Criar
                    <CirclePlus color="#F2F2F2" size={17}/>
                    </button>
            </form>

            <div>
                <div className="menu">
                    <div className="tasks-count">Tarefas criadas <div className="tasks-count-number">{tasks.length}</div></div>
                    <div className="concluded-tasks">
                        Concluídas
                        <div className="concluded-tasks-counter">
                            {tasks.length === 0 
                            ? "0" : `${tasks.filter(task => task.checked).length} de ${tasks.length}`}
                            
                        </div>
                    </div>
                </div>
                <div className="tasks-display">
               {tasks.length === 0 
               ? (
                <div className="no-tasks">
                    <img src="src\assets\Clipboard.png" />
                <p className="no-tasks-message">Você ainda não tem tarefas cadastradas.</p>
                <p className="no-tasks-message-two">Crie tarefas e organize seus itens a fazer.</p>
              </div>
               ) : (
                <div className="items">
                    
                <ul>
                    {tasks.map((task, index) => (
                        <li key={index}>
                            <div className={`task-container `}
                            >
                                
                                <div className="task-content">
                                    <input
                                        type="checkbox"
                                        checked={task.checked}
                                        onChange={() => handleToggleCheck(index)}
                                        className="checker"
                                    ></input>

                                    <span className={`task-description ${task.checked ? "checked" : "unchecked"}`}>{task.taskDescription}</span>
                                </div>


                                <button
                                    className="delete"
                                    onClick={() => handleDelete(index)}
                                >
                                    <Trash2 size={17} />

                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
               )}
               </div>

            </div>

        </div>
    )
}