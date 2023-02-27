var db, 
    app = new Vue({
    el:"#app",
    data:{
        forms:{
            docente:{ mostrar:false, },
            materia:{ mostrar:false, },
            alumno:{ mostrar:false, },
            matricula:{ mostrar:false, },
            inscripcion:{ mostrar:false, },
        }
    },
    methods: {
        abrirCerrarFormulario(form){
            this.forms[form].mostrar = !this.forms[form].mostrar;
            this.$refs[form].listar();
        },
        abrirBD() {
            let indexDB = indexedDB.open('db_sistema_academico', 1);
            indexDB.onupgradeneeded = e => {
                let req = e.target.result,
                    tbldocentes = req.createObjectStore('tbldocentes', {
                        keyPath: 'idDocente'
                    }),
                    tblalumnos = req.createObjectStore('tblalumnos', {
                        keyPath: 'idAlumno'
                    }),
                    tblmaterias = req.createObjectStore('tblmaterias', {
                        keyPath: 'idMateria'
                    });

                tbldocentes.createIndex('idDocente', 'idDocente', {
                    unique: true
                });
                tbldocentes.createIndex('codigo', 'codigo', {
                    unique: true
                });
            };
            indexDB.onsuccess = e => {
                db = e.target.result;
            };
            indexDB.onerror = e => {
                console.error('ERROR al crear, abrir la BD', e);
            };
        }
    },
    created() {
        this.abrirBD();
    }
});

function abrirStore(store, modo) {
    let ltx = db.transaction(store, modo);
    return ltx.objectStore(store);
}