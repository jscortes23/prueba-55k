import { SortBy, type User } from "../types.d"

interface UserListProps {
  users: User[]
  showColors: boolean
  changeSorting: (sort: SortBy) => void
  deleteUser: (index: string) => void
}

export const UsersList = ({ users, showColors, changeSorting, deleteUser }: UserListProps) => {
  return (
    <table style={{
      tableLayout: "fixed",
      borderCollapse: "collapse",
      width: "100%",
    }}>
      <thead>
        <tr>
          <th className="pointer">Foto</th>
          <th className="pointer" onClick={() => changeSorting(SortBy.NAME)}>Nombre</th>
          <th className="pointer" onClick={() => changeSorting(SortBy.LAST)}>Apellido</th>
          <th className="pointer" onClick={() => changeSorting(SortBy.COUNTRY)}>País</th>
          <th className="pointer">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {
          users.map((user, index) => {
            const bgColor = index % 2 === 0 ? "#444444" : "#787878"
            const color = showColors ? bgColor : "transparent"

            return (
              <tr key={user.login.uuid} style={{ backgroundColor: color }}>
                <td>
                  <img src={user.picture.thumbnail} alt={`Foto de ${user.name.first}`} />
                </td>
                <td>{user.name.first}</td>
                <td>{user.name.last}</td>
                <td>{user.location.country}</td>
                <td>
                  <button onClick={() => deleteUser(user.login.uuid)}>Eliminar</button>
                </td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}