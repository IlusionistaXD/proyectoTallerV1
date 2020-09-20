//aqui pondremos todas las funciones
const funciones = {};

funciones.inicio = (req, res) => {
    res.render('inicio');
};

funciones.showModel = (req, res) => {
    req.getConnection((err, conn) => {
        if (err){
            console.log(err);
        }else{
            conn.query('select * from personas', (err, personas) => {
                if (err){
                    console.log(err);
                }else{
                    console.log(personas);
                    res.render('modelo', {
                        data: personas
                    });
                };
            });
        }
    });
};

funciones.listar = (req, res) => {
    req.getConnection((err, conn) => {
        if (err){
            console.log(err);
        }else{
            conn.query('select * from personas', (err, personas) => {
                if (err){
                    console.log(err);
                }else{
                    console.log(personas);
                    res.render('personas', {
                        data: personas
                    });
                };
            });
        }
    });
};


funciones.delete = (req, res) => {
    //const id = req.params.id;
    const { id } = req.params;
    req.getConnection((err, conn) => {
        if (err){
            console.log(err);
        }else{
            conn.query('DELETE FROM personas WHERE id = ?', [id], (err, rows) => {
                if (err) {
                    console.log(err);
                }else{
                    res.redirect('/personas');
                }
            });
        }
    });
};

funciones.save = (req, res) => {
    const data = req.body;
    console.log(data);

    req.getConnection((err, conn) =>{
        if (err){
            console.log(err);
        }else{
            conn.query('INSERT INTO personas set ?', [data], (err, rows) =>{
                if (err){
                    console.log(err);
                }else{
                    console.log(rows);
                }
            });
        }
    });
    res.redirect('/personas');
};

funciones.saveLogin = (req, res) => {
    const data = req.body;
    console.log('aqui va el dato');
    console.log(data.id);

    req.getConnection((err, conn) =>{
        if (err){
            console.log(err);
        }else{
            conn.query('INSERT INTO entradas (id_personas) VALUES ('+ data.id +')', (err, rows) =>{
                if (err){
                    console.log(err);
                }else{
                    console.log(rows);
                }
            });
        }
    });
    res.redirect('/entradas');
};



funciones.logins = (req, res) => {
    req.getConnection((err, conn) => {
        if (err){
            console.log(err);
        }else{
            conn.query('select entradas.id, personas.id, personas.name, entradas.date_time from personas inner join entradas on personas.id = entradas.id_personas', (err, rows) => {
                if (err){
                    console.log(err);
                }else{
                    console.log(rows);

                    conn.query('select personas.id from personas', (err, personas) => {
                        if (err){
                            console.log(err);
                        }else{
                            console.log(personas);
                            res.render('entradas', {
                                data: rows,
                                personas: personas
                            });
                        }
                    });
                };
            });


        }
    });
};

module.exports = funciones;