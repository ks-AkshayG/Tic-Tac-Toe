import { useParams } from "react-router-dom"

const UserGameDetails = () => {
    const { id } =useParams()

  return (
    <div>UserGameDetails, {id}</div>
  )
}

export default UserGameDetails