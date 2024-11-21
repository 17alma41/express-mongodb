# Instalar MongoDB en linux

`mongoinstall.sh` ->

```bash
sudo apt-get install gnupg curl -y
curl -fsSL https://www.mongodb.org/static/pgp/server-8.0.asc | \
   sudo gpg -o /usr/share/keyrings/mongodb-server-8.0.gpg \
   --dearmor
echo "deb [ arch=amd64,arm64 signed-by=/usr/share/keyrings/mongodb-server-8.0.gpg ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/8.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-8.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
```

# Iniciar MongoDB

**Iniciarlo**:
```bash
sudo systemctl start mongod.service
```

**Iniciar el servidor cuando arranquemos el equipo**:
```bash
sudo systemctl enable mongod.service
```

**Pararlo**:
```bash
sudo systemctl stop mongod.service 
```

****
```bash
sudo systemctl disable mongod.service
```

**Reiniciar el servidor**:
```bash
sudo systemctl restart mongod.service
```

**Ver el estado del servidor**:
```bash
sudo systemctl status mongod.service
```

**Para empezar**:
```bash
mongosh 
```

## 
**Ejemplo**:

```bash
use libros

-- Crear una colección
db.createCollection("fantasia")

-- Obtener los nombres de las colecciones
db.getCollectionNames()

-- Insertar un objeto en la colección "fantasia"
db.fantasia.insertOne({ 
  "autor": "Tolkien",
  "titulo": "El señor de los anillos"
})

-- Insertar varios objetos en la colección "fantasia"
db.fantasia.insertMany([
  { 
    "autor": "Tolkien",
    "titulo": "El señor de los anillos"
  },
  { 
    "autor": "Brandon Sanderson",
    "titulo": "El hombre iluminado"
  }
])

-- Buscar documentos dentro de la colección "fantasia" con un filtro
db.fantasia.find({ "autor": "Tolkien" })

-- Actualizar un objeto en la colección "fantasia"
db.fantasia.updateOne(
  { "titulo": "El trono de cristal" },
  { $set: { "titulo": "El trono de cristal" } }
)

-- Refactorizar el campo `nombre` a `name` en la colección `usuarios`
db.usuarios.updateMany(
  {},
  { $rename: { "nombre": "name" } }
)

-- Borrar un documento de la colección "fantasia"
db.fantasia.deleteOne({ "titulo": "El trono de cristal" })

-- Borrar la base de datos
db.dropDatabase()

```
