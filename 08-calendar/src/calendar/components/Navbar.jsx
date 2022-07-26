export const Navbar = () => {
  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
      <span className="navbar-brand">
        <i className="fas fa-calendar-alt"></i>
        <span> Guido </span>
      </span>

      <button className="btn btn-outline-light">
        <i className="fas fa-sign-out-alt"></i>
        <span> Salir </span>
      </button>
    </div>
  )
}
