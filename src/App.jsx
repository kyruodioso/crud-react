import React from 'react';
import shortid from 'shortid';


function App() {

  const [tarea, setTarea] = React.useState('')
  const [tareas, setTareas] = React.useState([])
  const [modoEdicion , setModoEdicion]= React.useState(false)
  const [id, setId]= React.useState('')
  const [error, setError]= React.useState(null)

  const agregarTarea = e => {
    e.preventDefault();
    if (!tarea.trim()) {
      setError('Ingrese algo...')
      return
    }
    console.log(tarea)

    setTareas([
      ...tareas,
      { id: shortid.generate(), nombreTarea: tarea }
    ])

    setTarea('')
    setError(null)

  }


  const eliminarTarea = id => {
    const arrayFiltrado = tareas.filter(item => item.id !== id)
    setTareas(arrayFiltrado)
  }

  const editar = item =>{
    setModoEdicion(true)
    setTarea(item.nombreTarea)
    setId(item.id)
  }

  const editarTarea = e => {
    e.preventDefault()
    if (!tarea.trim()) {
      setError('Ingrese una tarea...')
      return
    }
  
    const arrayEditado = tareas.map(item=>item.id === id ? {id:id , nombreTarea:tarea} : item)

    setTareas(arrayEditado)
    setModoEdicion(false)
    setTarea('')
    setId('')
    setError(null)
  }


  return (
    <div className="container mt-5">
      <h1 className="text-center">Algo que hacer hoy</h1>
      <hr />
      <div className="row">
        <div className="col-6">
          <h4 className="text-center">Lista de tareas</h4>
          <ul className="list-group">
            {

             tareas.length === 0 ? (
                <img src="https://img.buzzfeed.com/buzzfeed-static/static/2016-02/15/13/enhanced/webdr12/enhanced-buzz-6328-1455562235-13.jpg" className="img-fluid" alt="" />
             ) : (
              tareas.map(item => (
                <li className="list-group-item" key={item.id}>
                  <span className="lead text-break">{item.nombreTarea}</span>
                  <button className="btn btn-danger btn-sm float-right mx-2"
                    onClick={() => eliminarTarea(item.id)}>
                    Eliminar
                  </button>
                  <button className="btn btn-success btn-sm float-right"
                  onClick={()=>editar(item)}>
                    Editar
                  </button>
                </li>
              ))
             )


            }

          </ul>
        </div>
        <div className="col-6">
          <h4 className="text-center">
            {modoEdicion ? 'Editar Tarea' : 'Agregar Tarea'}
          </h4>
          <form onSubmit={modoEdicion ? editarTarea : agregarTarea}>
            {
              error ? <span className="text-danger">{error}</span> : null
            }
            <input type="text" className="form-control mb-2"
              placeholder="Ingrese Tarea"
              onChange={e => setTarea(e.target.value)}
              value={tarea} />
              {
              modoEdicion ? (
                <button className="btn btn-warning btn-block" type="submit">Editar</button>
              ) : (
                <button className="btn btn-dark btn-block" type="submit">Agregar</button>
              )
              }{
              tareas.length === 0 ? ( null):
              (<img src="https://blog.trabajoendigital.com/wp-content/uploads/2020/03/original.jpg" className="img-fluid" alt="Responsive" />
              )
              }
          </form>
        </div>
      </div>

    </div>
  );
}

export default App;
