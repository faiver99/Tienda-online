# Mejoras para Servidor Express con MongoDB, Passport y Swagger

## **Puntos Claves**
1. **Conexión a MongoDB**
   - Se usa `useNewUrlParser` y `useUnifiedTopology` para evitar advertencias.
   - Se maneja la conexión con `process.env.MONGO_URI`.

2. **Gestión de Sesiones**
   - Se usa `connect-mongo` para almacenar sesiones en MongoDB.
   - Se recomienda agregar `ttl` para definir el tiempo de vida de la sesión.

3. **Documentación con Swagger**
   - Se configura en `./config/swagger.js`.
   - Disponible en `/api-docs`.

4. **Estructura Modular**
   - Rutas separadas en archivos distintos (`userRoutes`, `productRoutes`, etc.).

5. **Manejo de Errores**
   - Se captura cualquier error en los middlewares con un `500`.
   - Se recomienda devolver mensajes JSON más informativos.

---

## **Mejoras Sugeridas**

### **1. Mejor Manejo de Errores**
En lugar de enviar solo `"Something broke!"`, usa un JSON más informativo:

```js
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error', message: err.message });
});