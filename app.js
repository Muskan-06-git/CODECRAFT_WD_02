let startTime;
        let elapsedTime = 0;
        let timerInterval;
        let isRunning = false;
        let lapTimes = [];
        
        const display = document.getElementById('display');
        const startBtn = document.getElementById('startBtn');
        const pauseBtn = document.getElementById('pauseBtn');
        const resetBtn = document.getElementById('resetBtn');
        const lapBtn = document.getElementById('lapBtn');
        const lapTimesContainer = document.getElementById('lapTimes');
        
        function formatTime(time) {
            // Format time as HH:MM:SS.mmm
            let date = new Date(time);
            let hours = date.getUTCHours().toString().padStart(2, '0');
            let minutes = date.getUTCMinutes().toString().padStart(2, '0');
            let seconds = date.getUTCSeconds().toString().padStart(2, '0');
            let milliseconds = date.getUTCMilliseconds().toString().padStart(3, '0');
            
            return `${hours}:${minutes}:${seconds}.${milliseconds}`;
        }
        
        function updateDisplay() {
            display.textContent = formatTime(elapsedTime);
        }
        
        function startTimer() {
            if (!isRunning) {
                startTime = Date.now() - elapsedTime;
                timerInterval = setInterval(function() {
                    elapsedTime = Date.now() - startTime;
                    updateDisplay();
                }, 10);
                
                isRunning = true;
                updateButtonState();
            }
        }
        
        function pauseTimer() {
            if (isRunning) {
                clearInterval(timerInterval);
                isRunning = false;
                updateButtonState();
            }
        }
        
        function resetTimer() {
            clearInterval(timerInterval);
            isRunning = false;
            elapsedTime = 0;
            lapTimes = [];
            updateDisplay();
            updateButtonState();
            renderLapTimes();
        }
        
        function recordLap() {
            if (isRunning) {
                lapTimes.unshift(elapsedTime);
                renderLapTimes();
            }
        }
        
        function renderLapTimes() {
            if (lapTimes.length === 0) {
                lapTimesContainer.innerHTML = `
                    <div class="text-center py-4 text-gray-500">
                        No lap times recorded yet
                    </div>
                `;
            } else {
                lapTimesContainer.innerHTML = lapTimes.map((lap, index) => {
                    return `
                        <div class="lap-item px-4 py-3 flex justify-between items-center border-b border-gray-100">
                            <span class="text-gray-700">Lap ${lapTimes.length - index}</span>
                            <span class="font-mono">${formatTime(lap)}</span>
                        </div>
                    `;
                }).join('');
            }
        }
        
        function updateButtonState() {
            startBtn.disabled = isRunning;
            pauseBtn.disabled = !isRunning;
            resetBtn.disabled = isRunning && elapsedTime === 0;
            lapBtn.disabled = !isRunning;
        }
        
        // Event listeners
        startBtn.addEventListener('click', startTimer);
        pauseBtn.addEventListener('click', pauseTimer);
        resetBtn.addEventListener('click', resetTimer);
        lapBtn.addEventListener('click', recordLap);
   