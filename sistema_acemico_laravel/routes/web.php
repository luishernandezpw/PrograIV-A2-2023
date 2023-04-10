<?php
use App\Http\Controllers\AlumnoController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::apiResources([
    'alumnos'=>AlumnoController::class,
]);

Route::get('/', function () {
    return view('welcome');
});
Route::get('/alumno/{nombre}/{edad}', function($nombre='', $edad=0){
    $msg = $edad>=18 ? 'Eres un adulto resposanble' : 'Aun no tienes compromisos';
    return 'Hola, desde una ruta en laravel... '. $nombre. ' Msg: '. $msg;
})->where(['edad'=>'^[0-9]{1,3}', 'nombre'=>'^[a-zA-Z]{3,85}']);
