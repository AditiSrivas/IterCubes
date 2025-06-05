import serial
import webbrowser
import re

# Adjust 'COM3' to your Arduino's port (check in Arduino IDE)
ser = serial.Serial('COM9', 115200, timeout=1)

print("Listening to Arduino...")

while True:
    line = ser.readline().decode('utf-8').strip()
    if line:
        print("Received:", line)
        # Extract URL from line (e.g., "Opening URL: https://example.com")
        url_match = re.search(r'https?://[^\s]+', line)
        if url_match:
            url = url_match.group(0)
            print(f"Opening: {url}")
            webbrowser.open(url)