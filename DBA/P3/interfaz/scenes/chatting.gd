extends Node2D

@onready var chatBox := $Control/PanelContainer/chatBox
@onready var agente := $Agente
@onready var rudolf := $Rudolf
@onready var santa := $Santa
@onready var elfo :Sprite2D= $Elfo 

var message : String
# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	Events.chat_read.connect(Callable(self, "_message"), CONNECT_DEFERRED)
	_message()

# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	pass

func _first_message() -> void:
	message = Conection.respuesta
	var partes = message.find(": ")
	var persona = message.substr(0, partes)
	var texto = message.substr(partes + 2)
	_show_interaction_other(elfo, texto)
	await _play_text(Sounds.VOICE)
	Events.next.emit()

func _message() -> void:
	message = Conection.respuesta
	var partes = message.find(": ")
	var persona = message.substr(0, partes)
	var texto = message.substr(partes + 2)
	match persona:
		"AGENTE-SANTA":
			_show_interaction_agent(santa, texto)
		"AGENTE-ELFO":
			_show_interaction_agent(elfo, texto)
		"AGENTE-RUDOLPH":
			_show_interaction_agent(rudolf, texto)
		"SANTA-AGENTE":
			_show_interaction_other(santa, texto)
		"ELFO-AGENTE":
			_show_interaction_other(elfo, texto)
		"RUDOLPH-AGENTE":
			_show_interaction_other(rudolf, texto)
	
	if "HoHoHo" in message:
		await _play_text(Sounds.HOHOHO)
		Events.finished.emit()
	else:
		await _play_text(Sounds.VOICE)
		Events.next.emit()

func _play_text(sound) -> void:
	Sounds.play_sound(sound)
	var timer = Timer.new()
	add_child(timer)  # Añádelo como hijo al nodo actual
	timer.start(4)
	await timer.timeout

func _show_interaction_agent(actor: Node2D, texto: String) -> void:
	# Ocultar todos y mostrar solo el actor correspondiente
	santa.hide()
	elfo.hide()
	rudolf.hide()
	actor.show()
	actor.set_modulate(Color(1, 1, 1, 0.75))
	agente.set_modulate(Color(1, 1, 1, 1))
	chatBox.text = texto

func _show_interaction_other(actor: Node2D, texto: String) -> void:
	# Ocultar todos y mostrar solo el actor correspondiente
	santa.hide()
	elfo.hide()
	rudolf.hide()
	actor.show()
	actor.set_modulate(Color(1, 1, 1, 1))
	agente.set_modulate(Color(1, 1, 1, 0.75))
	chatBox.text = texto

func _esperar_respuesta(remitente_esperado: String) -> void:
	print("Esperando mensaje de: ", remitente_esperado)
	while true:
		await Events.agent_response
		var nueva_respuesta = Conection.respuesta.strip_edges()
		if nueva_respuesta.begins_with(remitente_esperado):
			print("Respuesta recibida de: ", remitente_esperado)
			_message()  # Procesar la respuesta recibida
			break
