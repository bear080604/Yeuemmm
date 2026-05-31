const envelope = document.querySelector('.envelope-wrapper');
const heart = document.querySelector('.heart');
const textContainer = document.getElementById('text');
const photoBackground = document.getElementById('photo-background');
const giftButton = document.getElementById('gift-button');

const letterText = `<strong>Dear Bé Iuu,</strong>
<p style="text-indent: 15px; margin-top: 10px;">
    Chúc bé tuổi mới luôn ngập tràn niềm vui, lúc nào cũng cười thật nhiều và giữ mãi sự đáng yêu này nhé! ✨🍰
</p>
<p style="text-indent: 15px; margin-top: 10px;">
    Cảm ơn vì đã xuất hiện và cùng tớ tạo nên những cuộc trò chuyện thật vui suốt thời gian qua. Mong rằng hành trình sắp tới của bé sẽ luôn suôn sẻ, hạnh phúc và... hy vọng là sẽ có tớ đồng hành dài dài phía trước. 🥰
</p>
<p style="text-indent: 15px; margin-top: 10px;">
    Sinh nhật vui vẻ nha bé! ❤️
</p>
<p class="love" style="text-align: right; font-weight: bold; margin-block: 15px; margin-right: 20px;">Ký tên: Bear 🐻❤️</p>`;

let typingStarted = false;

// Đợi universe.js load xong
window.addEventListener('load', () => {
    console.log('Page loaded, initUniverse available:', typeof window.initUniverse);
});

// Chỉ lắng nghe sự kiện click trên heart
heart.addEventListener('click', () => {
    envelope.classList.toggle('flap');
    envelope.classList.toggle('open');

    if (envelope.classList.contains('open')) {
        const music = document.getElementById('bg-music');
        if (music) {
            music.play().catch(e => console.log("Audio play failed:", e));
        }

        if (!typingStarted) {
            typingStarted = true;
            setTimeout(() => {
                startTyping();
            }, 2000);
        }
    }
});

function startTyping() {
    let i = 0;
    textContainer.innerHTML = '';

    function type() {
        if (i < letterText.length) {
            if (letterText.charAt(i) === '<') {
                let tagEnd = letterText.indexOf('>', i);
                if (tagEnd !== -1) {
                    textContainer.innerHTML += letterText.substring(i, tagEnd + 1);
                    i = tagEnd + 1;
                }
            } else {
                textContainer.innerHTML += letterText.charAt(i);
                i++;
            }

            const letter = document.querySelector('.letter');
            letter.scrollTop = letter.scrollHeight;

            const isMobile = window.innerWidth <= 600;
            const typingSpeed = isMobile ? 50 : 30;
            setTimeout(type, typingSpeed);
        } else {
            document.body.classList.add('typing-done');
            setTimeout(() => {
                giftButton.classList.add('show');
                const letter = document.querySelector('.letter');
                letter.scrollTop = letter.scrollHeight;
            }, 500);
        }
    }

    type();
}

giftButton.addEventListener('click', () => {
    console.log('Gift button clicked!');
    if (typeof window.initUniverse === 'function') {
        console.log('Calling initUniverse...');
        window.initUniverse();
    } else {
        console.error('initUniverse function not found!');
        alert('Chức năng vũ trụ chưa được tải. Vui lòng tải lại trang.');
    }
});

