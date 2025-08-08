import librosa
import numpy as np
from collections import defaultdict

def extract_vocal_notes(audio_path):
    """
    Extract vocal melody notes from an audio file.
    Returns a list of notes (e.g., ['C4', 'D4', 'E4'])
    """
    # Load audio file
    y, sr = librosa.load(audio_path, sr=None)
    
    # Use harmonic-percussive source separation to get vocals
    y_harmonic, y_percussive = librosa.effects.hpss(y)
    
    # Extract melody (pitch) using PYIN algorithm
    f0, voiced_flag, voiced_probs = librosa.pyin(y_harmonic, 
                                                fmin=librosa.note_to_hz('C2'), 
                                                fmax=librosa.note_to_hz('C7'))
    
    # Convert frequencies to note names
    notes = []
    for freq in f0:
        if not np.isnan(freq) and freq > 0:
            note = librosa.hz_to_note(freq)
            # Simplify to just the note name and octave (no cents)
            note = note.split('+')[0].split('-')[0]
            notes.append(note)
    
    # Simplify the notes (remove consecutive duplicates)
    simplified_notes = []
    prev_note = None
    for note in notes:
        if note != prev_note:
            simplified_notes.append(note)
            prev_note = note
    
    return simplified_notes