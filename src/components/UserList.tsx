import { type User } from "../types"

interface UserListProps {
  users: User[]
  showColors: boolean
  deleteUser: (index: string) => void
}

export const UsersList = ({ users, showColors, deleteUser }: UserListProps) => {
  return (
    <table style={{
      tableLayout: "fixed",
      borderCollapse: "collapse",
      width: "100%",
    }}>
      <thead>
        <tr>
          <th>Foto</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>País</th>
          <th>Acciones</th>
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