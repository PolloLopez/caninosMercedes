//src>services>emailService.js
import emailjs from "@emailjs/browser";

export const sendOrderEmail = async (order) => {
    const serviceID = "service_s2om3w5";
    const templateID = "template_h523flt";
    const publicKey = "U-W20WAGhW2dw36TU";

    const templateParams = {
    to_email: "dueño@tienda.com",
    subject: "¡Nueva compra en la tienda!",
    mensaje: `Se ha realizado un nuevo pedido con ID: ${order.id}. 
                Cliente: ${order.cliente.nombre}, 
                Email: ${order.cliente.email}, 
                Teléfono: ${order.cliente.telefono}, 
                Dirección: ${order.cliente.direccion}, 
                Total: $${order.total}`,
    };

    try {
    await emailjs.send(serviceID, templateID, templateParams, publicKey);
    console.log("Correo enviado al dueño");
    } catch (error) {
    console.error("Error al enviar correo:", error);
    }
};
