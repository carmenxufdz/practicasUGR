extends Control

func _on_start_pressed() -> void:
	Conection.send_message("START")
	Conection.read_mapa()
	Conection.change_interface()


func _on_quit_pressed() -> void:
	get_tree().quit()
