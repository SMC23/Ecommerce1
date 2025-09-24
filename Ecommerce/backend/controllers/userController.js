const db = require('../config/db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// -----------------------------
// Registro de usuario
// -----------------------------
// userController.js
exports.register = (req, res) => {
    const { nombre, correo, contrasena } = req.body;

    if (!nombre || !correo || !contrasena) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const sqlCheck = 'SELECT * FROM usuarios WHERE correo = ?';
    db.query(sqlCheck, [correo], (err, results) => {
        if (err) return res.status(500).json({ error: err });

        if (results.length > 0) {
            return res.status(400).json({ message: 'El correo ya está registrado' });
        }

        const hashedPassword = bcrypt.hashSync(contrasena, 10);

        const sql = 'INSERT INTO usuarios (nombre, correo, contrasena) VALUES (?, ?, ?)';
        db.query(sql, [nombre, correo, hashedPassword], (err, result) => {
            if (err) return res.status(500).json({ error: err });

            // Generar token
            // En register:
            const token = jwt.sign(
                { id: result.insertId, nombre, correo },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );


            res.status(201).json({
                message: 'Usuario registrado correctamente',
                token
            });
        });
    });
};

// -----------------------------
// Login de usuario
// -----------------------------
exports.loginUser = (req, res) => {
    const { correo, contrasena } = req.body
    const sql = 'SELECT * FROM usuarios WHERE correo = ?'

    db.query(sql, [correo], (err, results) => {
        if (err) return res.status(500).json({ error: err })

        if (results.length === 0) {
            return res.status(401).json({ message: 'Usuario no encontrado' })
        }

        const user = results[0]

        // Comparar contraseña
        const isMatch = bcrypt.compareSync(contrasena, user.contrasena)
        if (!isMatch) {
            return res.status(401).json({ message: 'Contraseña incorrecta' })
        }

        // Crear token
        const token = jwt.sign(
            { id: user.id, nombre: user.nombre, correo: user.correo },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        )

        res.json({ message: 'Login exitoso', token })


    })
}

// const db = require('../config/db');
// const supabase = require('../config/subase');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// // -----------------------------
// // Registro de usuario
// // -----------------------------
// exports.register = async (req, res) => {
//   const { nombre, correo, contrasena } = req.body;

//   if (!nombre || !correo || !contrasena) {
//     return res.status(400).json({ message: 'Todos los campos son obligatorios' });
//   }

//   try {
//     // ✅ Revisar si ya existe en Supabase
//     const { data: existingUser, error: checkError } = await supabase
//       .from('usuarios')
//       .select('*')
//       .eq('correo', correo);

//     if (checkError) throw checkError;
//     if (existingUser.length > 0) {
//       return res.status(400).json({ message: 'El correo ya está registrado' });
//     }

//     // ✅ Encriptar contraseña
//     const hashedPassword = bcrypt.hashSync(contrasena, 10);

//     // ✅ Guardar en Supabase (principal)
//     const { data, error } = await supabase
//       .from('usuarios')
//       .insert([{ nombre, correo, contrasena: hashedPassword }])
//       .select();

//     if (error) throw error;

//     const user = data[0];

//     // ✅ Guardar también en MySQL (si está disponible)
//     if (db) {
//       const sql =
//         'INSERT INTO usuarios (id, nombre, correo, contrasena) VALUES (?, ?, ?, ?)';
//       db.query(sql, [user.id, nombre, correo, hashedPassword], (err) => {
//         if (err) console.warn('⚠️ Error al guardar en MySQL:', err.message);
//       });
//     }

//     // ✅ Crear token
//     const token = jwt.sign(
//       { id: user.id, nombre, correo },
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' }
//     );

//     res.status(201).json({
//       message: 'Usuario registrado correctamente',
//       token,
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// // -----------------------------
// // Login de usuario
// // -----------------------------
// exports.loginUser = async (req, res) => {
//   const { correo, contrasena } = req.body;

//   try {
//     // ✅ Buscar usuario en Supabase
//     const { data, error } = await supabase
//       .from('usuarios')
//       .select('*')
//       .eq('correo', correo);

//     if (error) throw error;
//     if (data.length === 0) {
//       return res.status(401).json({ message: 'Usuario no encontrado' });
//     }

//     const user = data[0];

//     // ✅ Comparar contraseña
//     const isMatch = bcrypt.compareSync(contrasena, user.contrasena);
//     if (!isMatch) {
//       return res.status(401).json({ message: 'Contraseña incorrecta' });
//     }

//     // ✅ Crear token
//     const token = jwt.sign(
//       { id: user.id, nombre: user.nombre, correo: user.correo },
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' }
//     );

//     res.json({ message: 'Login exitoso', token });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
