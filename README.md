🛍️ BOOKSTORE – ECOMMERCE PORTFOLIO PROJECT

Este proyecto es una aplicación de ecommerce desarrollada como parte de mi portfolio personal.

El objetivo principal es demostrar conocimientos en:

Arquitectura frontend y backend

Manejo de estado

Autenticación básica

Formularios y validaciones

Diseño responsive

Separación de responsabilidades

Buenas prácticas de desarrollo moderno

Este proyecto tiene fines demostrativos y no está pensado para un entorno de producción real.

⚠️ NOTA IMPORTANTE SOBRE LOS FORMULARIOS
📩 NEWSLETTER

El formulario de suscripción a la newsletter no envía información real a ningún servidor ni servicio de correo.

La funcionalidad está simulada.

No se almacenan datos.

La respuesta es únicamente visual (UI).

El objetivo es demostrar:

Validación de formularios

Manejo de estados

Experiencia de usuario

En un entorno real, este formulario se integraría con un servicio de envío de emails como:

Resend

SendGrid

Mailgun

u otro proveedor con dominio verificado

📬 FORMULARIO DE CONTACTO

El formulario de contacto tampoco envía información real.

Los datos no se almacenan.

No se transmiten a un backend externo.

La respuesta de éxito es simulada con fines demostrativos.

En una implementación real, este formulario estaría conectado a una API que:

Validaría los datos en el backend

Almacenaría la información en una base de datos

Enviaría una notificación por correo electrónico

🔐 AUTENTICACIÓN

El sistema de login y registro está implementado para demostrar:

Manejo de formularios

Validación de credenciales

Flujo básico de autenticación

Protección de rutas en el frontend

No se realiza:

Verificación real por correo electrónico

Envío de códigos OTP

Confirmación de cuenta vía email

Estas funcionalidades podrían integrarse en una versión más avanzada del proyecto.

⚙️ NOTA SOBRE EL SERVIDOR (COLD START)

La API backend está desplegada en un servicio PaaS gratuito.

En este tipo de servicios (por ejemplo, Render), cuando el servidor permanece inactivo durante un período prolongado, puede entrar en modo de suspensión para ahorrar recursos.

Esto provoca que:

La primera solicitud (especialmente registro o login) pueda tardar unos segundos adicionales.

Las solicitudes posteriores funcionen con normalidad.

Este comportamiento es común en planes gratuitos de plataformas PaaS y no afecta la funcionalidad del proyecto.

🟢 TARJETA OFICIAL DE PRUEBA (SEGURO) esto a fin de procesar los pagos del checkout
No se envian mensajes al correo del usuario luego de realizada la compra pero se realiza el proceso de compra correctamente, las ordenes se veran en la pagina.

Stripe provee esta tarjeta pública para pruebas:

Card number: 4242 4242 4242 4242
Expiry date: cualquier fecha futura (ej: 12/34)
CVC: cualquier 3 dígitos (ej: 123)
ZIP: cualquier código válido


Esta tarjeta es universal para test mode y es totalmente segura de publicar.

🎯 OBJETIVO DEL PROYECTO

Este proyecto tiene como finalidad demostrar:

Estructura limpia y organizada

Arquitectura escalable

Flujo completo de usuario

Separación clara entre frontend y backend

Buenas prácticas en desarrollo web moderno

