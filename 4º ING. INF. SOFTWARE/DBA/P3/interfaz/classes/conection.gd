extends Node

var client := StreamPeerTCP.new()
var host := "127.0.0.1"  # Dirección IP del servidor
var port := 5000         # Puerto del servidor
var mapa_path := ""
var respuesta = ""
var interfaz = INTERFAZ.CHAT
var changed : bool = false

enum INTERFAZ {MAPA, CHAT}

const ruta_absoluta = "C:/Users/carme/OneDrive/Documentos/Universidad/4GII/PRIMER_CUATRI/Desarrollo Basado en Agentes/Practicas/DBA_P3/P3/json/entorno.json"

func _ready():
	Events.send_response.connect(Callable(self, "_send_response"), CONNECT_DEFERRED)
	Events.next.connect(Callable(self, "_next"), CONNECT_DEFERRED)
	Events.finished.connect(Callable(self, "_finished"), CONNECT_DEFERRED)
	iniciar_conexion()
	Music.play()

func iniciar_conexion():
	var err = client.connect_to_host(host, port)
	if err == OK:
		print("Intentando conectar al servidor Godot en ", host, ":", port)

	else:
		print("Error al intentar conectar: ", err)
	
func _process(delta):
	client.poll()

	if(changed):
		change_interface()

func send_message(message):
	var cleaned_message = message.strip_edges()
	client.put_utf8_string(cleaned_message + "\n")
	await wait_for_response()
	
func has_response() -> bool:
	return client.get_available_bytes() > 0
	
func wait_for_response() -> void:
	# Espera hasta que se reciba la respuesta del servidor
	while not has_response():
		get_tree().paused = true
	# Cuando haya respuesta, procesar la respuesta
	get_tree().paused = false
	receive_response()

func receive_response():
	if client.get_available_bytes() > 0:
		respuesta = client.get_utf8_string(client.get_available_bytes())
		print("Respuesta del servidor: ", respuesta)
	handle_response()

func handle_response() -> void:
	if "Energia" in respuesta:
		if(interfaz != INTERFAZ.MAPA):
			interfaz = INTERFAZ.MAPA
			changed = true;
		await read_mapa()
	else:
		if(interfaz != INTERFAZ.CHAT):
			interfaz = INTERFAZ.CHAT
			changed = true;
		Events.chat_read.emit()

func change_interface() -> void:
	match interfaz:
		INTERFAZ.MAPA:
			get_tree().change_scene_to_file("res://scenes/interfaz.tscn")
			changed = false
		INTERFAZ.CHAT:
			get_tree().change_scene_to_file("res://scenes/chatting.tscn")
			changed = false

func read_mapa():
	var data = await file_read(ruta_absoluta)
	if !data:
		return
	var file = FileAccess.open("res://entorno.json", FileAccess.WRITE)
	if file:
		file.store_string(data)
		file.close()
		Events.emit_signal("mapa_read")
	else:
		print("Error al abrir archivo para escritura.")
		

func file_read(ruta : String) -> String:
	var timer = Timer.new()
	add_child(timer)  # Añádelo como hijo al nodo actual
	timer.start(1)
	await timer.timeout
	
	if !FileAccess.file_exists(ruta):
		print("Archivo no encontrado en la ruta: ", ruta)
		return ""
	var file = FileAccess.open(ruta, FileAccess.READ)
	if file:
		var data = file.get_as_text()
		file.close()
		return data
	else:
		print("Error al abrir el archivo en la ruta: ", ruta)
		return ""

func _finished() -> void:
	get_tree().paused = true
	Music.stop()
	
func _next() -> void:
	send_message("STEP")
