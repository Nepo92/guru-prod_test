function moduleMedia() {
    const span = $('.info-block__text');
    const homework = $('.part-content__type');
    let result;

    $.each(span, (count, elem) => {
        if (count + 1 !== 1 && (count + 1) % 3 === 0) {
            const text = $(elem).text();

            if (innerWidth < 515) {
                const arr = text.split(' ');
            
                if (arr.length > 2) {
                    arr.splice(1, 1);
                }

                result = arr.join(' ');
                $(elem).html(result);
            }

            if (innerWidth >= 515) {
                const arr = text.split(' ');

                if (arr.length < 3) {
                    arr.splice(1, 0, 'домашнее');
                }
        
                result = arr.join(' ');
                $(elem).html(result);
            }
        }
    })

    $.each(homework, (index, item) => {
        if (index % 2 === 1) {
            const text = $(item).text();

            if (innerWidth < 515) {
                const arr = text.split(' ');
            
                if (arr.length > 2) {
                    arr.splice(1, 1);
                }

                result = arr.join(' ');
                $(item).html(result);
            }

            if (innerWidth >= 515) {
                const arr = text.split(' ');
        
                if (arr.length < 3) {
                    arr.splice(1, 0, 'домашнее');
                }
        
                result = arr.join(' ');
                $(item).html(result);
            }
        }
    });
}

moduleMedia();

$(window).resize(moduleMedia);