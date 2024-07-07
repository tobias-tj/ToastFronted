import Task from "./Task";

const TaskList = ({ data, currentPage, getAllTasks }) => {
    return ( 
        <main className='main'>
            {data?.content?.length === 0 && <div>No Tasks. Please add a new tasks.</div>}

            <ul className='task__list'>
                {data?.content?.length > 0 && data.content.map(task => <Task task={task} key={task.id} />)}
            </ul>

            {data?.content?.length > 0 && data?.totalPages > 1 &&
            <div className='pagination'>
                <a onClick={() => getAllTasks(currentPage - 1)} className={0 === currentPage ? 'disabled' : ''}>&laquo;</a>
                
                { data && [...Array(data.totalPages).keys()].map((page, index) =>
                    <a onClick={() => getAllTasks(page)} className={currentPage === page ? 'active' : ''} key={page}>{page + 1}</a>)}
                
                <a onClick={() => getAllTasks(currentPage + 1)} className={data.totalPages === currentPage + 1 ? 'disabled' : ''}>&raquo;</a>
            </div>
            }
        </main>
     );
}
 
export default TaskList;