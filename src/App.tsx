import { useEffect, useRef, useState } from "react"
import "./App.css"
import { type User } from "./types"
import { UsersList } from "./components/UserList"

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [showColor, setShowColor] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)
  const originalUsers = useRef<User[]>([])


  const toogleColors = () => {
    setShowColor(!showColor)
  }

  const toogleSortByCountry = () => {
    setSortByCountry(preState => !preState)
  }

  const handleDelete = (uuid: string) => {
    const filteredUSer = users.filter((user) => user.login.uuid !== uuid)
    setUsers(filteredUSer)
  }

  const handleReset = () => {
    setUsers(originalUsers.current)
  }

  const sortedUsers = sortByCountry
    // ? [...users].sort((a, b) => { Una forma de copiar el estado sin mutarlo
    // Se creo el tipado (archivo types.d.ts) en caso de no ser sortado
    ? users.toSorted((a, b) => {
      return a.location.country.localeCompare(b.location.country)
    })
    : users

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=100")
      .then(data => data.json())
      .then(data => {
        setUsers(data.results)
        originalUsers.current = data.results
      })
      .catch(error => console.error(error))
  }, [])

  return (
    <div>
      <div className="h1">Prueba técnica</div>
      <header>
        <button onClick={toogleColors}>Colorear filas</button>
        <button onClick={toogleSortByCountry}>Ordenar por país</button>
        <button onClick={handleReset}>Resteaer</button>
      </header>
      <UsersList deleteUser={handleDelete} showColors={showColor} users={sortedUsers} />
    </div>
  )
}

export default App
