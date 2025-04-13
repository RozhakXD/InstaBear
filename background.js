chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'setInstagramCookies') {
        setInstagramCookies(request.ds_user_id, request.sessionid)
            .then(() => sendResponse(true))
            .catch(() => sendResponse(false));
        return true;
    }
});

async function setInstagramCookies(ds_user_id, sessionid) {
    const cookieUrl = 'https://www.instagram.com';

    try {
        await removeCookie(cookieUrl, 'ds_user_id');
        await removeCookie(cookieUrl, 'sessionid');
        await removeCookie(cookieUrl, 'ig_did');

        await setCookie(cookieUrl, {
            name: 'ds_user_id',
            value: ds_user_id,
            domain: '.instagram.com'
        });

        await setCookie(cookieUrl, {
            name: 'sessionid',
            value: sessionid,
            domain: '.instagram.com'
        });

        await setCookie(cookieUrl, {
            name: 'ig_did',
            value: generateRandomId(),
            domain: '.instagram.com'
        });

        console.log('Instagram cookies set successfully');
        return true;
    } catch (error) {
        console.error('Failed to set cookies:', error);
        return false;
    }
}

async function setCookie(url, cookie) {
    return chrome.cookies.set({
        url: url,
        name: cookie.name,
        value: cookie.value,
        domain: cookie.domain,
        path: '/',
        secure: true,
        httpOnly: cookie.name === 'sessionid',
        sameSite: 'lax',
        expirationDate: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30
    });
}

async function removeCookie(url, name) {
    return chrome.cookies.remove({url: url, name: name});
}

function generateRandomId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    }).toUpperCase();
}