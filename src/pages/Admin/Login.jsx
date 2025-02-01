import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [password, setPassword] = useState ("");
    const navigate = useNavigate();

    const handleLogin = () => {
        if (password === "admin123") { //Contraseña temporal
            localStorage.setItem("isAdmin", "true");
            navigate("/admin");
        }else {
            alert("Contraseña incorrecta")
        }
    };

    return (
        <div>
            <h1>Login de Administrador</h1>
            <input
            type="password"
            placeholder="Ingrese la contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Ingresar</button>
        </div>
    );
};

export default Login;