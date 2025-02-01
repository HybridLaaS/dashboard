setInterval(() => {
    document.body.style.backgroundColor = "#" + (Math.random() * 0xFFFFFF | 0).toString(16);
}, 1000);