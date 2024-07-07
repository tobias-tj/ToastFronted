import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getTask, getUsers } from "../api/TaskService";
import { ToastError, ToastSuccess } from "../api/ToastService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.module.css";


const TaskDetail = ({updateTask}) => {
    const [task, setTask] = useState({
        id: '',
        completedDateTask: '',
        initialDateTask: '',
        taskDescription: '',
        taskPriority: '',
        taskTitle: '',
        userId: '',
        userName: ''
    });

    const [users, setUsers] = useState([]); 
    const { id } = useParams();

    const fetchTask = async (id) => {
        try {
            const { data } = await getTask(id);//api
            setTask({
                ...data,
                initialDateTask: new Date(data.initialDateTask),
                completedDateTask: new Date(data.completedDateTask)
            });
            ToastSuccess('Task retrieved');
        } catch (error) {
            console.log(error);
            ToastError(error.message);
        }
    };

    const fetchUser = async () => {
        try{
            const {data} = await getUsers();
            if(data && Array.isArray(data.content)) {
                setUsers(data.content);
            }else{
                ToastError('Invalid data structure for users');
            }
        }catch(error){
            ToastError(error.message);
        }
    }

    const onChange = (event) => {
        const { name, value } = event.target;
        
        if (name === 'userId') {
            const selectedUser = users.find(user => user.id === value);
            setTask({ 
                ...task, 
                [name]: value, 
                userName: selectedUser ? selectedUser.name : '' 
            });
        } else {
            setTask({ ...task, [name]: value });
        }    
    };

    const handleDateChange = (date, name) => {
        setTask({ ...task, [name]: date });
    };


    const onUpdateTask = async (event) => {
        event.preventDefault();
        if (!task.userId) {
            ToastError('Please select a user');
            return;
        }
        // console.log("Task to be updated:", task);

        try{
            await updateTask({
                ...task,
                initialDateTask: task.initialDateTask.toISOString(),
                completedDateTask: task.completedDateTask.toISOString()
            });        
            fetchTask(id);
            ToastSuccess('Task Updated');
        }catch(error){
            ToastError(error.message);
        }
    };

    useEffect(() => {
        fetchTask(id);
        fetchUser();
    }, [id]);

    return ( 
        <>
            <Link to="/tasks" className="btn link">
                <i className="bi bi-arrow-left"></i> 
            </Link>
            <div className="container mt-4">
                <div className="card">
                    <div className="card-header">
                        <h5>Task Details</h5>
                    </div>
                    <div className="card-body">
                        <form onSubmit={onUpdateTask}>
                            <div className="mb-3">
                                <label htmlFor="taskTitle" className="form-label">Titulo</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="taskTitle"
                                    value={task.taskTitle}
                                    onChange={onChange}
                                    name="taskTitle"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="taskDescription" className="form-label">Descripcion De Tarea</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="taskDescription"
                                    value={task.taskDescription}
                                    onChange={onChange}
                                    name="taskDescription"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="taskPriority" className="form-label">Prioridad</label>
                                <select
                                    type="text"
                                    className="form-select"
                                    id="taskPriority"
                                    value={task.taskPriority}
                                    onChange={onChange}
                                    name="taskPriority"
                                    required
                                >
                                    <option value="">Seleccione una prioridad</option>
                                    <option value="Baja">Baja</option>
                                    <option value="Media">Media</option>
                                    <option value="Alta">Alta</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="initialDateTask" className="form-label form-inicio">Fecha Inicio</label>
                                <DatePicker
                                    selected={task.initialDateTask}
                                    onChange={(date) => handleDateChange(date, 'initialDateTask')}
                                    className="form-control"
                                    id="initialDateTask"
                                    name="initialDateTask"
                                    dateFormat="yyyy-MM-dd"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="completedDateTask" className="form-label form-final">Fecha Limite</label>
                                <DatePicker
                                    selected={task.completedDateTask}
                                    onChange={(date) => handleDateChange(date, 'completedDateTask')}
                                    className="form-control"
                                    id="completedDateTask"
                                    name="completedDateTask"
                                    dateFormat="yyyy-MM-dd"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="userId" className="form-label">Usuario Asignado</label>
                                <select
                                    className="form-select"
                                    id="userId"
                                    value={task.userId}
                                    onChange={onChange}
                                    name="userId"
                                    required
                                >
                                    <option value="">Seleccione un usuario</option>
                                        {users.map((user) => (
                                            <option key={user.id} value={user.id}>{user.name}</option>
                                        ))}

                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary">Guardar</button>
                        </form>
                    </div>
                </div>
            </div>
    </>

     );
}
 
export default TaskDetail;