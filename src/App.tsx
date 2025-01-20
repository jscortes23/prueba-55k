import { useEffect, useMemo, useRef, useState } from "react"
import "./App.css"
import { SortBy, type User } from "./types.d"
import { UsersList } from "./components/UserList"

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [showColor, setShowColor] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  // Guardar le estado iniciar cuando se cargan los resultados por primera vez
  const originalUsers = useRef<User[]>([])

  // Cambiar el color de cada fila alterando
  const toogleColors = () => {
    setShowColor(!showColor)
  }

  // Ordenar por orden alfabetico
  const toogleSortByCountry = () => {
    const newSortingValue = sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  // Eliminar un registro de la tabla
  const handleDelete = (uuid: string) => {
    const filteredUser = users.filter((user) => user.login.uuid !== uuid)
    setUsers(filteredUser)
  }

  // Volver al estado inicial de la tabla
  const handleReset = () => {
    setUsers(originalUsers.current)
  }

  // Ordernar filas por 
  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=100")
      .then(data => data.json())
      .then(data => {
        setUsers(data.results)
        originalUsers.current = data.results
      })
      .catch(error => console.error(error))
  }, [])

  const filteredUser = useMemo(() => {
    return typeof filterCountry === "string" && filterCountry.length > 0
      ? users.filter(user => user.location.country.toLowerCase().includes(filterCountry.toLowerCase()))
      : users
  }, [users, filterCountry])

  const sortedUsers = useMemo(() => {

    if (sorting === SortBy.NONE) return filteredUser

    if (sorting === SortBy.NAME) {
      return filteredUser.toSorted(
        (a, b) => a.location.country.localeCompare(b.name.first)
      )
    }

    if (sorting === SortBy.COUNTRY) {
      return filteredUser.toSorted(
        (a, b) => a.location.country.localeCompare(b.location.country)
      )
    }

    if (sorting === SortBy.LAST) {
      return filteredUser.toSorted(
        (a, b) => a.name.last.localeCompare(b.name.last)
      )
    }
    // ? [...users].sort((a, b) => { Una forma de copiar el estado sin mutarlo
    // Se creo el tipado (archivo types.d.ts) en caso de no ser sortado
    // return sorting === SortBy.COUNTRY
    //   ? filteredUser.toSorted(
    //     (a, b) => a.location.country.localeCompare(b.location.country)
    //   )
    //   : filteredUser

  }, [filteredUser, sorting])

  return (
    <div>
      <div className="h1">Prueba técnica</div>
      <header>
        <button onClick={toogleColors}>Colorear filas</button>
        <button onClick={toogleSortByCountry}>Ordenar por país</button>
        <button onClick={handleReset}>Resteaer</button>
        <input type="text" placeholder="Filtra por país" onChange={(e) => {
          setFilterCountry(e.target.value)
        }} />
      </header>
      <UsersList changeSorting={handleChangeSort} deleteUser={handleDelete} showColors={showColor} users={sortedUsers ?? []} />
    </div>
  )
}

export default App
