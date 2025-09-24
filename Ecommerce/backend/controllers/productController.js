const db = require('../config/db')
const supabase = require('../config/subase')

// Mostrar todos los productos
exports.getProductos = async (req, res) => {
  try {
    const { data, error } = await supabase.from("productos").select("*");
    if (error) throw error;
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Agregar producto
exports.createProducto = async (req, res) => {
  const { nombre, precio, imagen, descripcion } = req.body

  try {
    // ✅ Guardar en Supabase (fuente principal)
    const { data, error } = await supabase
      .from("productos")
      .insert([{ nombre, precio, imagen, descripcion }])
      .select();

    if (error) throw error;

    const producto = data[0];

    // ✅ Guardar en MySQL si está disponible
    if (db) {
      const sql =
        "INSERT INTO productos (id, nombre, precio, imagen, descripcion) VALUES (?, ?, ?, ?, ?)";
      db.query(
        sql,
        [producto.id, nombre, precio, imagen, descripcion],
        (err) => {
          if (err) console.warn("⚠️ Error al guardar en MySQL:", err.message);
        }
      );
    }

    res.status(201).json({ message: "Producto guardado", producto });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Eliminar producto
exports.deleteProducto = async (req, res) => {
  const id = req.params.id
  try {
    // ✅ Borrar en Supabase
    const { error } = await supabase.from("productos").delete().eq("id", id);
    if (error) throw error;

    // ✅ Intentar borrar en MySQL si está conectado
    if (db) {
      db.query("DELETE FROM productos WHERE id = ?", [id], (err) => {
        if (err) console.warn("⚠️ Error al borrar en MySQL:", err.message);
      });
    }

    res.status(200).json({ message: "Producto eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
