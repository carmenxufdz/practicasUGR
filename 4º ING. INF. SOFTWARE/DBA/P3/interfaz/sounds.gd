extends Node

const HOHOHO = preload("res://sound/hohoho.mp3")
const VOICE = preload("res://sound/voice.mp3")

@onready var audioPlayers: = $AudioPlayers

func play_sound(sound):
	for audioStreamPlayer in audioPlayers.get_children():
		if not audioStreamPlayer.playing:
			audioStreamPlayer.stream = sound
			audioStreamPlayer.play()
			break
