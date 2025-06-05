import serial
import webbrowser

# Set the correct COM port and baud rate
ser = serial.Serial('COM5', 9600)

face_to_url = {
    "TOP": "https://example.com/Prototype/top",
    "BOTTOM": "https://example.com/Prototype/bottom",
    "FRONT": "https://example.com/Prototype/front",
    "BACK": "https://example.com/Prototype/back",
    "LEFT": "https://example.com/Prototype/left",
    "RIGHT": "https://example.com/Prototype/right"
}

last_face = ""

while True:
    line = ser.readline().decode('utf-8').strip()
    if line.startswith("Face:"):
        face = line.split(":")[1].strip()
        if face != last_face:
            last_face = face
            url = face_to_url.get(face, None)
            if url:
                webbrowser.open(url)
                print(f"Opened {url}")
