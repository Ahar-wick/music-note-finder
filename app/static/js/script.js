document.addEventListener('DOMContentLoaded', function() {
    const uploadBtn = document.getElementById('upload-btn');
    const audioUpload = document.getElementById('audio-upload');
    const loadingDiv = document.querySelector('.loading');
    const resultsDiv = document.querySelector('.results');
    const notesDisplay = document.getElementById('notes-display');
    const keyboardDiv = document.getElementById('keyboard');
    const errorDiv = document.getElementById('error-message');
    
    // Note to keyboard position mapping (simplified)
    const notePositions = {
        'C3': { left: '5%', width: '3.5%' },
        'C#3': { left: '8.5%', width: '2.5%' },
        'D3': { left: '11%', width: '3.5%' },
        'D#3': { left: '14.5%', width: '2.5%' },
        'E3': { left: '17%', width: '3.5%' },
        'F3': { left: '20.5%', width: '3.5%' },
        'F#3': { left: '24%', width: '2.5%' },
        'G3': { left: '26.5%', width: '3.5%' },
        'G#3': { left: '30%', width: '2.5%' },
        'A3': { left: '32.5%', width: '3.5%' },
        'A#3': { left: '36%', width: '2.5%' },
        'B3': { left: '38.5%', width: '3.5%' },
        'C4': { left: '42%', width: '3.5%' },
        'C#4': { left: '45.5%', width: '2.5%' },
        'D4': { left: '48%', width: '3.5%' },
        'D#4': { left: '51.5%', width: '2.5%' },
        'E4': { left: '54%', width: '3.5%' },
        'F4': { left: '57.5%', width: '3.5%' },
        'F#4': { left: '61%', width: '2.5%' },
        'G4': { left: '63.5%', width: '3.5%' },
        'G#4': { left: '67%', width: '2.5%' },
        'A4': { left: '69.5%', width: '3.5%' },
        'A#4': { left: '73%', width: '2.5%' },
        'B4': { left: '75.5%', width: '3.5%' },
        'C5': { left: '79%', width: '3.5%' },
        'C#5': { left: '82.5%', width: '2.5%' },
        'D5': { left: '85%', width: '3.5%' },
        'D#5': { left: '88.5%', width: '2.5%' },
        'E5': { left: '91%', width: '3.5%' }
    };
    
    uploadBtn.addEventListener('click', function() {
        audioUpload.click();
    });
    
    audioUpload.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            uploadAudio(this.files[0]);
        }
    });
    
    function uploadAudio(file) {
        // Reset UI
        loadingDiv.classList.remove('hidden');
        resultsDiv.classList.add('hidden');
        errorDiv.classList.add('hidden');
        
        const formData = new FormData();
        formData.append('file', file);
        
        fetch('/', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw new Error(err.error || 'Server error') });
            }
            return response.json();
        })
        .then(data => {
            displayResults(data.notes);
        })
        .catch(error => {
            showError(error.message);
        })
        .finally(() => {
            loadingDiv.classList.add('hidden');
        });
    }
    
    function displayResults(notes) {
        // Display notes as text
        notesDisplay.innerHTML = '';
        notes.forEach(note => {
            const noteElement = document.createElement('span');
            noteElement.className = 'note';
            noteElement.textContent = note;
            notesDisplay.appendChild(noteElement);
        });
        
        // Display notes on keyboard
        keyboardDiv.innerHTML = '';
        notes.forEach(note => {
            const position = notePositions[note];
            if (position) {
                const keyHighlight = document.createElement('div');
                keyHighlight.className = 'key-highlight';
                keyHighlight.style.left = position.left;
                keyHighlight.style.width = position.width;
                keyboardDiv.appendChild(keyHighlight);
            }
        });
        
        resultsDiv.classList.remove('hidden');
    }
    
    function showError(message) {
        errorDiv.textContent = message;
        errorDiv.classList.remove('hidden');
    }
});