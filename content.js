async function checkLoginStatus() {
    const cookies = await chrome.cookies.getAll({domain: '.instagram.com'});
    const hasSession = cookies.some(c => c.name === 'sessionid');
    const hasUserId = cookies.some(c => c.name === 'ds_user_id');

    if (hasSession && hasUserId) {
        console.log('Instagram session cookies detected');
    } else {
        console.log('No valid Instagram session found');
    }
}

if (window.location.hostname.includes('instagram.com')) {
    checkLoginStatus();

    chrome.storage.onChanged.addListener((changes, namespace) => {
        if (changes.instagramToken) {
            console.log('Token updated, verifying login...');
            checkLoginStatus();
        }
    });
}