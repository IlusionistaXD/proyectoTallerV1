CREATE DATABASE personal;

use personal;

CREATE TABLE personas (
    id INT(6) UNSIGNED PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    address VARCHAR(100) NOT NULL,
    phone VARCHAR(15)
);

CREATE TABLE entradas (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    id_personas INT(6) UNSIGNED NOT NULL
);

alter table entradas add foreign key(id_personas) references personas(id) ON DELETE CASCADE;

alter table entradas add column date_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP;



INSERT INTO personas (id, name, address, phone) VALUES (214212, 'Eduardo Rivera', 'santa cruz', '3500225');
INSERT INTO personas (id, name, address, phone) VALUES (8969130, 'Pablo Rodriguez', 'japon', '78177512');

INSERT INTO entradas (id, persona_id) VALUES (1, 8969130);
INSERT INTO entradas (id, persona_id) VALUES (2, 214212);

DELETE FROM personas where personas.id = 8969130;


        
        
        
modelo.associate = function(models) {
        modelo.belongsTo	(models.entradas, {foreignKey: 'persona_id', as: 'personasEntradas'})
    };
    
modelo.associate = function(models) {
        modelo.hasMany(models.personas, {as: 'entradasPersonas'})
    };
    
  
    
    
<div class="form-group">
                            <input type="file" name="image" id="image"class="form-control">
                        </div>


<form action="/addEnter" method="post">
                        <div class="form-group">
                            <input type="number" name="id" placeholder="ID" class="form-control" id="new">
                        </div>

                        <div class="form-group">
                            <input type="text" name="name" placeholder="Nombre" class="form-control">
                        </div>
                        
                        <button type="submit" class="btn btn-primary">
                            Registrar Entrada
                        </button>
                        
                        
                        </form>    
    
