<?php
include '../../config/config.php';
extract($_REQUEST);
$docente = isset($docente) ? $docente : '[]';
$class_docente = new Docente($conexion);
print_r($class_docente->recibir_datos($docente));

class Docente{
    private $datos=[], $db;
    public $respuesta = ['msg'=>'ok'];

    public function __construct($db=''){
        $this->db=$db;
    }
    public function recibir_datos($docente){
        $this->datos = json_decode($docente, true);
        return $this->validar_datos();
    }
    private function validar_datos(){
        if( empty($this->datos['id']) ){
            $this->respuesta['msg'] = 'NO se ha espesificado un ID';
        }
        if( empty($this->datos['codigo']) ){
            $this->respuesta['msg'] = 'Por favor ingrese un codigo de docente, el codigo es un numero de 3 digitos';
        }
        if( empty($this->datos['nombre']) ){
            $this->respuesta['msg'] = 'Por favor digite su nombre';
        }
        return $this->administrar_docente();
    }
    private function administrar_docente(){
        
    }
}
?>