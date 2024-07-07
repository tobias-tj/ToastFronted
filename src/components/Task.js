import { Link } from "react-router-dom";
import moment from "moment";

const Task = ({task}) => {
    var alertClass = '';
    switch (task.taskPriority.toLowerCase()) {
        case 'alta':
            alertClass = 'alert alert-danger'; // Rojo para alta
            break;
        case 'mediana':
            alertClass = 'alert alert-warning'; // Amarillo para mediana
            break;
        case 'baja':
            alertClass = 'alert alert-success'; // Verde para baja
            break;
        default:
            alertClass = 'alert alert-primary'; // Por defecto, alerta primaria
    }
    const formattedDate = moment(task.initialDateTask).format('DD-MM-YYYY');


    return ( 
        <Link to={`/tasks/${task.id}`} className="text-decoration-none">
            <div className="card mb-3" style={{ minWidth: '250px', maxWidth: '600px', transition: 'box-shadow 0.3s', borderRadius: '10px' }} 
                 onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)'}
                 onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
                <div className="card-header d-flex justify-content-between align-items-center">
                    <div>
                        <h5 className="mb-0">{task.taskTitle}</h5>
                        <small className="text-muted">Inicio: {formattedDate}</small>
                    </div>
                </div>
                <div className="card-body">
                    <p className="mb-1">
                        <i className="bi bi-person-fill me-2"></i>{task.userName}
                    </p>
                    <div className={alertClass} role="alert">
                        Prioridad: {task.taskPriority}
                    </div>
                </div>
            </div>
        </Link>
    );
}
 
export default Task;