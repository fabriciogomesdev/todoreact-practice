import { useEffect, useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form";
import "./styles.css"
import { Trash2 } from "lucide-react";
export default function Tasks() {

    interface Task extends Object {
        taskDescription: string;
        checked: boolean;
    }

    const { register, handleSubmit } = useForm();
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
                
                })}
            >
                <input {...register("taskDescription", { required: true })} placeholder="Adicione uma nova tarefa" className="new-task"/>
                <button type="submit" className="create">Criar</button>
            </form>

            <div>
                <div className="menu">
                <div>Tarefas criadas {tasks.length}</div>
                <div>Concluídas {tasks.filter(task => task.checked).length} de {tasks.length}</div>
                </div>
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
                                    onChange={() => handleToggleCheck(index)} />

                                <span className={`task-description ${task.checked ? "checked" : "unchecked"}`}>{task.taskDescription}</span>
                                </div>


                                <button
                                    className="delete"
                                    onClick={() => handleDelete(index)}
                                >
                                    <Trash2 size={17} color="#808080"/>
                                    
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
                </div>

            </div>

        </div>
    )
}