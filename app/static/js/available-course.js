function cardMedia() {

  const span = document.querySelectorAll('.info-block');

   for (let i = 5; i < span.length; i += 6) {
     const block = span[i].children[0];
     const text = span[i].children[0].innerText;

     if (innerWidth < 515) {
        const arr = text.split(' ');

        if (arr.length > 2) {
            arr.splice(1, 1);
        }

        result = arr.join(' ');
        block.innerHTML = result;
     }

        if (innerWidth >= 515) {
            const arr = text.split(' ');

            if (arr.length < 3) {
                arr.splice(1, 0, 'домашнее');
            }

            result = arr.join(' ');
            block.innerHTML = result;
        }
    }
}

cardMedia();

window.addEventListener('resize', cardMedia);