
const Header = ({ toggleModal, nbOfContacts }) => {
    return (  
        <header className='header'>
        <div className='container'>
            <h3>Task List ({nbOfContacts})</h3>
            <button onClick={() => toggleModal(true)} className='btn'>
            <i className='bi bi-plus-square'></i> Add New Task
            </button>
        </div>
        </header>
    );
}
 
export default Header;