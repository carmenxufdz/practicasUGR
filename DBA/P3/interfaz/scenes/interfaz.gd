extends Node

class_name Interfaz 
@onready var tileMap := $TileMap
@onready var agente := $Agente
@onready var deer := $Deer
@onready var energia_label := $Energia
@onready var santa := $Santa
@onready var camera := $Camera2D
@onready var remote := $Agente/RemoteTransform2D

var mapa : Mapa
var entorno : Entorno
var tile_size : float
var all_deer : bool = false

func _ready():
	Events.mapa_read.connect(Callable(self,"_mapa_paint"), CONNECT_DEFERRED)
	_mapa_paint()
	if mapa.get_N() > 10:
		remote.remote_path = camera.get_path()
	agente.play("default")

func _process(delta: float) -> void:
	pass

func _mapa_paint() -> void:
	var file = FileAccess.open("res://entorno.json", FileAccess.READ)
	if file:
		var json_data = file.get_as_text()
		file.close()
		var json = JSON.new()
		var parse_err = json.parse(json_data)
		if parse_err == OK:
			var data = json.get_data()
			var mapa_data = data["mapa"]
			mapa = save_mapa(mapa_data)
			entorno = save_entorno(data,mapa)
			pintar_mapa(mapa)
			pintar_entorno(entorno)
			reached_deer(entorno)
			actualizar_energia()
			Events.next.emit()
		else:
			print("Error al parsear el JSON")
	else:
		print("No se pudo abrir el archivo JSON")

func save_mapa(data) -> Mapa:
	return Mapa.new(data["ruta"], data["N"], data["M"], data["matriz"])
	
func save_entorno(data, mapa: Mapa) -> Entorno:
	return Entorno.new(mapa, data["posAgente"], data["posObjetivo"])

func leer_mapa_desde_txt(ruta:String) -> Mapa:
	var file = FileAccess.open(ruta, FileAccess.READ)
	if not file:
		print("No se pudo abrir el archivo")
		return null
	var N = file.get_line().to_int()
	var M = file.get_line().to_int()
	var matriz = []
	
	for i in range(N):
		var linea = file.get_line().strip_edges()
		var valores = linea.split("\t")
		for j in range(M):
			matriz.append([valores[j].to_int()])
	file.close()
	
	return Mapa.new(ruta, N, M, matriz)

func pintar_entorno(entorno:Entorno)->void:
	agente.position.y = entorno.get_pos_agente()[0] * tile_size + tile_size/2
	agente.position.x = entorno.get_pos_agente()[1] * tile_size + tile_size/2
	deer.position.y = entorno.get_pos_objetivo()[0] * tile_size + tile_size/2
	deer.position.x = entorno.get_pos_objetivo()[1] * tile_size + tile_size/2
	santa.position.y = entorno.get_pos_objetivo()[0] * tile_size + tile_size/2
	santa.position.x = entorno.get_pos_objetivo()[1] * tile_size + tile_size/2
	
	if not agente.visible:
		agente.show()
	
	tileMap.set_cell(1,Vector2i(entorno.get_pos_agente()[1], entorno.get_pos_agente()[0]),1, Vector2i(0,0), 0)

func pintar_mapa(mapa : Mapa) -> void:
	deer.show()
	tileMap.set_scale(Vector2(float(22)/10,float(22)/10))
	tile_size = 32 * 22/10
	agente.set_scale(Vector2(float(22)/10,float(22)/10))
	santa.set_scale(Vector2(float(22)/10,float(22)/10))
	deer.set_scale(Vector2(float(2.5)/10,float(2.5)/10))
	for y in range(mapa.get_N()):
		for x in range(mapa.get_M()):
			if mapa.matriz[y][x] == 0:
				tileMap.set_cell(0,Vector2i(x,y),0,Vector2i(0,0),0)
			elif mapa.matriz[y][x] == -1:
				tileMap.set_cell(0,Vector2i(x,y),2,Vector2i(0,0),0)
	
func reached_deer(entorno : Entorno) -> void:
	if entorno.get_pos_agente() == entorno.get_pos_objetivo():
		deer.hide()
		Events.contador_renos += 1
		

func actualizar_energia() -> void:
	var respuesta = Conection.respuesta
	var separador = respuesta.find(":")
	var energia = int(respuesta.substr(separador + 1))
	energia_label.text = "Energia: %d" % energia

func _on_menu_button_pressed() -> void:
	Conection.send_message("STEP")
