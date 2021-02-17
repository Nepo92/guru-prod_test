function moduleMedia() {

    const span = document.querySelectorAll('.info-block');
    const homework = document.querySelectorAll('.part-content__type');
    const text = homework[1].innerText;


    if (innerWidth < 515) {
        const arr = text.split(' ');

        if (arr.length > 2) {
            arr.splice(1, 1);
        }

        result = arr.join(' ');
        homework[1].innerHTML = result;
    }

    if (innerWidth >= 515) {
        const arr = text.split(' ');

        if (arr.length < 3) {
            arr.splice(1, 0, 'домашнее');
        }

        result = arr.join(' ');
        homework[1].innerHTML = result;
    }


    for (let i = 2; i < span.length; i += 2) {
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

moduleMedia();

window.addEventListener('resize', moduleMedia);