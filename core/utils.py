# ses/utils.py
import sounddevice as sd
import numpy as np
import speech_recognition as sr

# Ses kaydını alacak fonksiyon
def record_audio(duration=5, samplerate=16000):
    print("Konuşmaya başlayın...")
    audio = sd.rec(int(duration * samplerate), samplerate=samplerate, channels=1, dtype='int16')
    sd.wait()
    return audio

# Ses kaydını metne dönüştürmek için fonksiyon
def convert_audio_to_text(audio_data):
    recognizer = sr.Recognizer()
    audio_data_obj = sr.AudioData(audio_data.tobytes(), 16000, 2)
    
    try:
        print("Metne dönüştürülüyor...")
        text = recognizer.recognize_google(audio_data_obj, language="az-AZ")  # Türkçe dilinde tanıma
        return text
    except sr.UnknownValueError:
        return "Anlaşılamadı, lütfen tekrar konuşun."
    except sr.RequestError as e:
        return f"Google API'ye bağlanırken bir hata oluştu: {e}"
