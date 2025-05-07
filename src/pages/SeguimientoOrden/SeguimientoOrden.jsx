// src/pages/SeguimientoOrden.jsx
//solo para los users

import React, { useEffect, useState } from 'react';
import { getDocs, collection, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './SeguimientoOrden.css';

const SeguimientoOrden = () => {
  const { users } = useAuth();
  const navigate = useNavigate();
  const [ordenes, setOrdenes] = useState([]);
  const [ordenesAbiertas, setOrdenesAbiertas] = useState({});

  // Redirigir a admin si el usuario es admin
  useEffect(() => {
    if (users?.role === 'admin') {
      navigate('/admin/ordenes');
    }
  }, [users, navigate]);

  // Si no es un usuario normal, mostrar mensaje de acceso restringido
  if (users?.role !== 'users') {
    return <p>Acceso restringido, solo usuarios pueden ver sus órdenes.</p>;
  }

  useEffect(() => {
    const fetchOrdenes = async () => {
      const ordenesSnapshot = await getDocs(collection(db, 'ordenes'));
      const ordenesData = ordenesSnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((orden) => orden.datosCliente?.email === users?.email); // ✅ filtra por usuario
      setOrdenes(ordenesData);
    };

    if (users?.email) {
      fetchOrdenes();
    }
  }, [users]);

  const toggleDetalles = (id) => {
    setOrdenesAbiertas((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const confirmarRecepcion = async (orden) => {
    const nuevaAccion = {
      accion: 'Recibido por el cliente',
      fecha: new Date().toISOString(),
      usuario: orden.datosCliente.email,
    };

    const nuevaHistorial = [...(orden.historial || []), nuevaAccion];

    await updateDoc(doc(db, 'ordenes', orden.id), {
      estado: 'Finalizado',
      historial: nuevaHistorial,
    });

    setOrdenes((prev) =>
      prev.map((o) =>
        o.id === orden.id ? { ...o, estado: 'Finalizado', historial: nuevaHistorial } : o
      )
    );
  };

  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto', padding: '1rem' }}>
      <h2>📦 Seguimiento de tus órdenes</h2>
      {ordenes.map((orden) => (
        <div className="tarjeta-orden" key={orden.id}>
          <div className="encabezado-orden">
            <p><strong>ID:</strong> {orden.id}</p>
            <div className={`estado-label ${orden.estado?.toLowerCase() || "pendiente"}`}>
              {orden.estado === "Pendiente" && "🕓 Pendiente"}
              {orden.estado === "Preparado" && "📦 Preparado"}
              {orden.estado === "Despachado" && "🚚 Despachado"}
              {orden.estado === "Entregado" && "✅ Entregado"}
              {orden.estado === "Finalizado" && "🎉 Finalizado"}
            </div>
          </div>

          <button onClick={() => toggleDetalles(orden.id)}>
            {ordenesAbiertas[orden.id] ? 'Ocultar Detalles' : 'Ver Detalles'}
          </button>

          <div className={`detalles-orden ${ordenesAbiertas[orden.id] ? 'activo' : ''}`}>
            <h4>📋 Productos</h4>
            <ul>
              {orden.productos.map((p, idx) => (
                <li key={idx}>
                  {p.nombre} x{p.cantidad} - ${p.precio.toLocaleString()}
                </li>
              ))}
            </ul>

            <h4>👤 Cliente</h4>
            <p><strong>Nombre:</strong> {orden.datosCliente?.nombre}</p>
            <p><strong>Ciudad:</strong> {orden.datosCliente?.ciudad}</p>
            <p><strong>Dirección:</strong> {orden.datosCliente?.direccion}</p>
            <p><strong>Email:</strong> {orden.datosCliente?.email}</p>
            <p><strong>Teléfono:</strong> {orden.datosCliente?.telefono}</p>

            <h4>💰 Total:</h4>
            <p>${orden.total.toLocaleString()}</p>
          </div>

          {orden.estado !== 'Finalizado' && (
            <button
              className="boton-recibido"
              onClick={() => confirmarRecepcion(orden)}
            >
              Confirmar recepción
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default SeguimientoOrden;
