document.addEventListener('DOMContentLoaded', () => {
    const tokenInput = document.getElementById('token-input');
    const statusDiv = document.getElementById('status');
    const loginBtn = document.getElementById('login-btn');

    tokenInput.focus();

    loginBtn.addEventListener('click', async () => {
        const token = tokenInput.value.trim();

        if (!token) {
            showStatus('Please enter a token', 'error');
            tokenInput.focus();
            return;
        }

        loginBtn.disabled = true;
        loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
        clearStatus();

        try {
            const cleanToken = extractInstagramToken(token);

            if (!cleanToken) {
                throw new Error('No valid Instagram token found in the input')
            }

            const sessionInfo = decodeInstagramToken(cleanToken);

            const success = await chrome.runtime.sendMessage({
                action: 'setInstagramCookies',
                ds_user_id: sessionInfo.ds_user_id,
                sessionid: sessionInfo.sessionid
            });

            if (success) {
                showStatus('Login successful! Opening Instagram...', 'success');
                setTimeout(() => {
                    chrome.tabs.create({url: "https://www.instagram.com/"});
                }, 3000);
            } else {
                throw new Error('Failed to set cookies');
            }
        } catch (error) {
            showStatus(`Error: ${error.message}`, 'error');
            console.error('Token processing error:', error);
        } finally {
            loginBtn.disabled = false;
            loginBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login with Token';
        }
    });

    function showStatus(message, type) {
        statusDiv.textContent = message;
        statusDiv.className = 'status ' + type;
    }

    function clearStatus() {
        statusDiv.className = 'status';
        statusDiv.textContent = '';
    }

    function extractInstagramToken(text) {
        const cleanText = text.replace(/[^a-zA-Z0-9:=+/]/g, '');

        const pattern = /BearerIGT:2:(eyJ[\w\-_=+]+==)/;
        const match = cleanText.match(pattern);

        if (match) {
            return `Bearer IGT:2:${match[1]}`;
        }

        const altPattern = /IGT:2:(eyJ[\w\-_=+]+==)/;
        const altMatch = cleanText.match(altPattern);

        if (altMatch) {
            return `IGT:2:${altMatch[1]}`;
        }

        const base64Pattern = /(eyJ[\w\-_=+]+==)/;
        const base64Match = cleanText.match(base64Pattern);

        return base64Match ? base64Match[0] : null;
    }

    function decodeInstagramToken(token) {
        try {
            let base64Part;

            if (token.includes('IGT:2:')) {
                base64Part = token.split('IGT:2:')[1];
            } else if (token.startsWith('eyJ')) {
                base64Part = token;
            } else {
                throw new Error('Unrecognized token format');
            }

            const decodedString = atob(base64Part);
            const sessionInfo = JSON.parse(decodedString);

            if (!sessionInfo.ds_user_id || !sessionInfo.sessionid) {
                throw new Error('Token missing required fields (ds_user_id or sessionid)');
            }

            return sessionInfo;
        } catch (error) {
            throw new Error(`Token decoding failed: ${error.message}`);
        }
    }
});