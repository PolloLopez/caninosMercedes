// src/pages/Usuario/DetallePedido.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import "./DetallePedido.css";

const DetallePedido = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pedido, setPedido] = useState(null);

  useEffect(() => {
    const obtenerPedido = async () => {
      try {
        const referencia = doc(db, "ordenes", id);
        const documento = await getDoc(referencia);
        if (documento.exists()) {
          setPedido({ id: documento.id, ...documento.data() });
        } else {
          console.log("No existe el documento");
        }
      } catch (error) {
        console.error("Error al obtener el pedido:", error);
      }
    };

    obtenerPedido();
  }, [id]);

  const obtenerClaseEstado = (estado) => {
    switch (estado) {
      case "pendiente":
        return "estado-pendiente";
      case "en preparación":
        return "estado-preparacion";
      case "en camino":
        return "estado-envio";
      case "finalizado":
        return "estado-finalizado";
      default:
        return "";
    }
  };

  if (!pedido) return <p>Cargando pedido...</p>;

  return (
    <div className="detalle-pedido">
      <h2>Pedido #{pedido.id}</h2>
      <p><strong>Nombre:</strong> {pedido.nombre}</p>
      <p><strong>Email:</strong> {pedido.email}</p>
      <p><strong>Estado:</strong> <span className={obtenerClaseEstado(pedido.estado)}>{pedido.estado}</span></p>
      {pedido.fechaEstado && (
        <p><strong>Último cambio de estado:</strong> {new Date(pedido.fechaEstado.seconds * 1000).toLocaleString()}</p>
      )}
      <h3>Productos:</h3>
      <ul>
        {pedido.items.map((item) => (
          <li key={item.id}>
            {item.nombre} - {item.cantidad} x ${item.precio}
          </li>
        ))}
      </ul>
      <p><strong>Total:</strong> ${pedido.total}</p>

      <button className="btn-volver" onClick={() => navigate(-1)}>⬅ Volver</button>
    </div>
  );
};

export default DetallePedido;
