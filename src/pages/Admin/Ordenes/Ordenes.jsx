// src/pages/Admin/Ordenes.jsx

import "./Ordenes.css";
import { useState, useEffect } from "react";
import { db } from "@/firebase";
import {
  collection,
  doc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

const Ordenes = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState("todos");

  useEffect(() => {
    const q = query(collection(db, "ordenes"), orderBy("fecha", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const ordenesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrdenes(ordenesData);
    });
    return () => unsub();
  }, []);

  const cambiarEstado = async (id, nuevoEstado) => {
    const ordenRef = doc(db, "ordenes", id);
    await updateDoc(ordenRef, { estado: nuevoEstado });
  };

  // 🔎 Búsqueda global: busca en nombre, email, dirección, ciudad y teléfono
  const ordenesFiltradas = ordenes.filter((orden) => {
    const cliente = orden.cliente || {};

    const nombre = cliente.nombreCompleto?.toLowerCase() || "";
    const email = cliente.email?.toLowerCase() || "";
    const direccion = cliente.direccion?.toLowerCase() || "";
    const ciudad = cliente.ciudad?.toLowerCase() || "";
    const telefono = cliente.telefono?.toLowerCase() || "";

    const termino = searchTerm.toLowerCase();

    const coincideBusqueda =
      nombre.includes(termino) ||
      email.includes(termino) ||
      direccion.includes(termino) ||
      ciudad.includes(termino) ||
      telefono.includes(termino);

    const coincideEstado =
      estadoFiltro === "todos" || orden.estado === estadoFiltro;

    return coincideBusqueda && coincideEstado;
  });

  return (
    <div className="ordenes-container">
      <h2>📦 Gestión de Órdenes</h2>

      {/* 🔹 Filtros */}
      <div className="filtros">
        <input
          type="text"
          placeholder="Buscar cliente por nombre, email, dirección..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select value={estadoFiltro} onChange={(e) => setEstadoFiltro(e.target.value)}>
          <option value="todos">Todos los estados</option>
          <option value="pendiente">Pendiente</option>
          <option value="en camino">En camino</option>
          <option value="entregado">Entregado</option>
          <option value="finalizado">Finalizado</option>
        </select>
      </div>

      {/* 🔹 Lista de órdenes */}
      {ordenesFiltradas.length === 0 ? (
        <p>No se encontraron órdenes.</p>
      ) : (
        ordenesFiltradas.map((orden) => {
          const cliente = orden.cliente || {};

          return (
            <div key={orden.id} className="orden-card">
              <h3>{cliente.nombreCompleto || "Sin nombre"}</h3>
              <p><strong>Email:</strong> {cliente.email || "No disponible"}</p>
              <p><strong>Teléfono:</strong> {cliente.telefono || "No disponible"}</p>
              <p><strong>Dirección:</strong> {cliente.direccion || "No disponible"}{cliente.ciudad ? `, ${cliente.ciudad}` : ""}</p>
              <p><strong>Método de pago:</strong> {orden.metodoPago || "No especificado"}</p>

              <p><strong>Estado:</strong> {orden.estado}</p>
              <select
                value={orden.estado || "pendiente"}
                onChange={(e) => cambiarEstado(orden.id, e.target.value)}
              >
                <option value="pendiente">Pendiente</option>
                <option value="en camino">En camino</option>
                <option value="entregado">Entregado</option>
                <option value="finalizado">Finalizado</option>
              </select>

              <ul>
                {Array.isArray(orden.items) && orden.items.length > 0 ? (
                  orden.items.map((producto, index) => (
                    <li key={index}>
                      {producto.nombre} x{producto.cantidad} — ${producto.precio}
                    </li>
                  ))
                ) : (
                  <li>Sin productos</li>
                )}
              </ul>

              <p><strong>Total:</strong> ${orden.total || 0}</p>
              <p>
                <small>
                  {orden.fecha?.seconds
                    ? new Date(orden.fecha.seconds * 1000).toLocaleString()
                    : "Fecha no disponible"}
                </small>
              </p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Ordenes;
