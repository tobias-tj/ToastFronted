import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import TaskList from './components/TaskList';
import TaskDetail from './components/TaskDetail';
import { useEffect, useRef, useState } from 'react';
import { getTasks, getUsers, patchTask, saveTask } from './api/TaskService';
import { ToastError, ToastSuccess } from "./api/ToastService";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.module.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const modalRef = useRef();
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [values, setValues] = useState({
      completedDateTask: null,
      initialDateTask: null,
      taskDescription: '',
      taskPriority: '',
      taskTitle: '',
      userId: '',
      userName: ''
  });
  const [users, setUsers] = useState([]); 


  const getAllTasks = async (page = 0, size = 10) => {
    try {
      setCurrentPage(page);
      const { data } = await getTasks(page, size);
      // console.log(data) 
      setData(data);
      // console.log(data);
    } catch (error) {
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
    setValues({ ...values, [name]: value });
    // console.log(values);
  };

  const handleDateChange = (date, name) => {
    setValues({ ...values, [name]: date });
};

  const handleNewTask = async (event) => {
    event.preventDefault();
    const selectedUser = users.find(user => user.id === values.userId);
    const formattedValues = {
      taskTitle: values.taskTitle,
      taskDescription: values.taskDescription,
      taskPriority: values.taskPriority,
      initialDateTask: values.initialDateTask ? values.initialDateTask.toISOString() : null,
      completedDateTask: values.completedDateTask ? values.completedDateTask.toISOString() : null,
      user: {
        id: values.userId,
        name: selectedUser ? selectedUser.name : ''
      }
    };
    // console.log('Formatted Values:', formattedValues); 
    ToastSuccess('Task Created!');
    try {
      const { data } = await saveTask(formattedValues);
      getAllTasks();
      toggleModal(false);
      resetForm()
    } catch (error) {
      ToastError(error.message);
    }
  }

  const resetForm = () => {
    setValues({
      completedDateTask: null,
      initialDateTask: null,
      taskDescription: '',
      taskPriority: '',
      taskTitle: '',
      userId: '',
      userName: ''
    })
  }

  const updateTask = async (task) => {
    try {
      const { data } = await patchTask(task);
      getAllTasks();
    } catch (error) {
      ToastError(error.message);
    }
  };

  const toggleModal = (show) => {
    if (show) {
      modalRef.current.showModal();
    } else {
      modalRef.current.close();
    }
  };
  useEffect(() => {
    getAllTasks();
    fetchUser();
  }, []);





  return (
    <>
      <Header toggleModal={toggleModal} nbOfContacts={data.totalElements} />
      <main className="main">
        <div className="container">
          <Routes>
            <Route path="/" element={<Navigate to={"/tasks"} />} />
            <Route path="/tasks" element={<TaskList data={data} currentPage={currentPage} getAllTasks={getAllTasks}/>}/>
            <Route path="/tasks/:id" element={<TaskDetail updateTask={updateTask} />} />
          </Routes>
        </div>
      </main>

      {/* Modal */}
      <dialog ref={modalRef} className="Modal" id="modal">
        <div className="modal__header">
          <h3>New Task</h3>
          <i onClick={() => toggleModal(false)} className="bi bi-x-lg"></i>
        </div>
        <div className="divider"></div>
        <div className="modal__body">
          <form onSubmit={handleNewTask}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Titulo</span>
                <input type="text" value={values.taskTitle} onChange={onChange} name="taskTitle" required />
              </div>
              <div className="input-box">
                <span className="details">Descripcion</span>
                <input type="text" value={values.taskDescription} onChange={onChange} name="taskDescription" required />
              </div>
              <div className="input-box">
                <span className="details">Prioridad</span>
                <select type="text" className="form-select" id="taskPriority" value={values.taskPriority} onChange={onChange} name='taskPriority' required>
                  <option value="">Seleccione una prioridad</option>
                  <option value="Baja">Baja</option>
                  <option value="Media">Media</option>
                  <option value="Alta">Alta</option>
                </select>
              </div>
              <div className="input-box">
                <span className="details">Fecha Inicio</span>
                <DatePicker selected={values.initialDateTask} onChange={(date) => handleDateChange(date, 'initialDateTask')} name="initialDateTask" className="form-control" id="initialDateTask" dateFormat="yyyy-MM-dd" required />
              </div>
              <div className="input-box">
                <span className="details">Fecha Final</span>
                <DatePicker selected={values.completedDateTask} onChange={(date) => handleDateChange(date, 'completedDateTask')} name="completedDateTask" className="form-control" id="completedDateTask" dateFormat="yyyy-MM-dd" required />
              </div>
              <div className="input-box">
              <select
                className="form-select"
                id="userId"
                value={values.userId}
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
              
            </div>
            <div className="form_footer">
              <button
                onClick={() => toggleModal(false)}
                type="button"
                className="btn btn-danger"
              >
                Cancel
              </button>
              <button type="submit" className="btn">
                Save
              </button>
            </div>
          </form>
        </div>
      </dialog>
      <ToastContainer />

    </>
  );
}

export default App;
