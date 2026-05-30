const envelope = document.querySelector('.envelope-wrapper');
const heart = document.querySelector('.heart');
const textContainer = document.getElementById('text');
const photoBackground = document.getElementById('photo-background');
const giftButton = document.getElementById('gift-button');

const letterText = `<strong>Dear Dr.Gifter,</strong>
<p style="text-indent: 15px; margin-top: 10px;">
    Cảm ơn em vì đã đến bên anh và trở thành điều tuyệt vời nhất trong cuộc sống của anh. Sự dịu dàng, lòng tốt, sự mạnh mẽ và luôn quan tâm của em khiến anh cảm thấy may mắn và hạnh phúc hơn mỗi ngày. Cảm ơn em vì luôn ở bên anh, ủng hộ anh vô điều kiện, dù là những lúc vui vẻ hay những khi anh gặp khó khăn.
</p>
<p style="text-indent: 15px; margin-top: 10px;">
    Có em trong cuộc đời, anh học được cách yêu thương, kiên nhẫn và trân trọng từng khoảnh khắc nhỏ bé. Em không chỉ là người anh yêu, mà còn là chỗ dựa, là nguồn động viên, là lý do để anh cố gắng trở thành người tốt hơn mỗi ngày.
</p>
<p style="text-indent: 15px; margin-top: 10px;">
    Anh yêu em nhiều hơn những gì lời nói có thể diễn tả — không chỉ hôm nay, mà là mỗi ngày, và sẽ luôn như vậy mãi mãi.
</p>
<p class="love" style="text-align: center; font-weight: bold; margin-block: 15px;">Love You Dr.Gifter</p>`;

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

            setTimeout(type, 30);
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

