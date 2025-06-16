import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { user, logout } = useContext(AuthContext); // suscritos al contexto para acceder a los datos del usuario

  if (!user) {
    return <div className="container mt-5 w-50">Cargando...</div>; // si no hay usuario, mostrar mensaje de carga
  }

  return (
    <div className="container mt-5 w-50">
      <h1>Bienvenido, {user?.name}</h1>
      <p>Email: {user?.email}</p>
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
};

export default Profile;
