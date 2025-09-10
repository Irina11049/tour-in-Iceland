
$(document).ready(function () {

    const burger = document.getElementById('burger');
    const menu = document.getElementById('menu');
    const closeBtn = document.querySelector('.close');

    burger.addEventListener('click', () => {
        menu.classList.toggle('active');
    });

    closeBtn.addEventListener('click', () => {
        menu.classList.remove('active');
    });

    // Анимация для первой дорожки
    const path = document.querySelector('#dotted-line path');
    let dashOffset = 0;
    const dashArray = parseFloat(path.getAttribute('stroke-dasharray').split(',')[0]); // 7

    function animate() {
        dashOffset -= 0.5; // скорость анимации
        if (dashOffset <= -dashArray * 2) { // сброс, чтобы цикл был плавным
            dashOffset = 0;
        }
        path.setAttribute('stroke-dashoffset', dashOffset);
        requestAnimationFrame(animate);
    }
    animate();

    // Анимация для второй дорожки (с преимуществами) 
    const svgAdvantages = document.querySelector('.advantages-items-desktop');
    const pathAdvantages = svgAdvantages.querySelector('path');

    const dashArrayAdvantages = parseFloat(pathAdvantages.getAttribute('stroke-dasharray').split(',')[0]);
    let dashOffsetAdvantages = 0;

    function animateAdvantages() {
        dashOffsetAdvantages -= 0.5; // скорость анимации
        if (dashOffsetAdvantages <= -dashArrayAdvantages * 2) {
            dashOffsetAdvantages = 0;
        }
        pathAdvantages.setAttribute('stroke-dashoffset', dashOffsetAdvantages);
        requestAnimationFrame(animateAdvantages);
    }
    animateAdvantages();

    // Для третьего SVG мобильной версии
    const svgAdvantagesMobile = document.querySelector('.advantages-items-mobile');
    const pathAdvantagesMobile = svgAdvantagesMobile.querySelector('path');

    const dashArrayAdvantagesMobile = parseFloat(pathAdvantagesMobile.getAttribute('stroke-dasharray').split(',')[0]);
    let dashOffsetAdvantagesMobile = 0;

    function animateAdvantagesMobile() {
        dashOffsetAdvantagesMobile -= 0.5; // скорость анимации
        if (dashOffsetAdvantagesMobile <= -dashArrayAdvantagesMobile * 2) {
            dashOffsetAdvantagesMobile = 0;
        }
        pathAdvantagesMobile.setAttribute('stroke-dashoffset', dashOffsetAdvantagesMobile);
        requestAnimationFrame(animateAdvantagesMobile);
    }
    animateAdvantagesMobile();

    //Для уникальных мест (достопримечательностей)
    const attractionIds = ['for-one', 'for-two', 'for-three', 'for-four', 'for-five'];

    function showAttraction(idToShow, $clickedButton) {
        // Переключаем отображение блоков
        $.each(attractionIds, function (index, id) {
            const $element = $('#' + id);
            if ($element.length) {
                if (id === idToShow) {
                    $element.css('display', 'flex');
                } else {
                    $element.css('display', 'none');
                }
            }
        });

        $('.attractions-map-btn').removeClass('active-button');
        $clickedButton.addClass('active-button');
    }

    $('#one').click(function () { showAttraction('for-one', $(this)); });
    $('#two').click(function () { showAttraction('for-two', $(this)); });
    $('#three').click(function () { showAttraction('for-three', $(this)); });
    $('#four').click(function () { showAttraction('for-four', $(this)); });
    $('#five').click(function () { showAttraction('for-five', $(this)); });

    showAttraction('for-one', $('#one'));
    $('#one').addClass('active-button');

    //Для видео
    $('#play-video').click(function () {
        let videoImg = $('.video-img');
        let videoBlock = $('.video-block');
        $('#play-video').hide()
        videoImg.css("display", "none")
        videoBlock.css()

    })

    //Для программы тура
    document.querySelectorAll('.program-items').forEach((container) => {
        const items = container.querySelectorAll('.program-item');
        let currentInd = 0;

        const prevBtn = container.querySelector('.btn-prev');
        const nextBtn = container.querySelector('.btn-next');

        function showItem(index) {
            items.forEach((item, i) => {
                item.classList.toggle('active', i === index);
            });
        }

        showItem(currentInd);

        prevBtn.addEventListener('click', () => {
            currentInd = (currentInd - 1 + items.length) % items.length;
            showItem(currentInd);
        });

        nextBtn.addEventListener('click', () => {
            currentInd = (currentInd + 1) % items.length;
            showItem(currentInd);
        });
    });


    //Для блока с отзывами
    const reviewsContainer = document.querySelector('.reviews-users');
    const reviews = Array.from(reviewsContainer.querySelectorAll('.reviews-user'));
    const totalReviews = reviews.length;
    let currentIndex = 0;

    function showReview(index) {
        reviews.forEach((review, i) => {
            review.style.display = i === index ? 'grid' : 'none';
        });
    }

    showReview(currentIndex);

    reviewsContainer.addEventListener('click', (e) => {
        if (e.target.closest('.reviews-btn-prev')) {
            currentIndex = (currentIndex - 1 + totalReviews) % totalReviews;
            showReview(currentIndex);
        }
        if (e.target.closest('.reviews-btn-next')) {
            currentIndex = (currentIndex + 1) % totalReviews;
            showReview(currentIndex);
        }
    });

    //Для галереи
    $('.gallery-items').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
        speed: 500,
        prevArrow: '<button type="button" class="slick-prev custom-prev-arrow"></button>',
        nextArrow: '<button type="button" class="slick-next custom-next-arrow"></button>'
    });

    $('.gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        gallery: {
            enabled: true
        }
    });

    let loader = $('.loader-block')

    $('#submit').on('click', function () {
        $('.error-message').hide();
        $('#name').removeClass('input-error');
        $('#phone').removeClass('input-error');

        let isValid = true;

        // Проверка кол-во человек
        if ($('.order-form-amount-input:checked').length === 0) {
            isValid = false;
            $('.order-form-amount .error-message').show();
        }

        // Проверка поля имени
        const nameVal = $('#name').val().trim();
        if (nameVal === '') {
            isValid = false;
            $('#name').addClass('input-error');
            $('#name').next('.error-message').show();
        }

        // Проверка поля телефона
        const phoneVal = $('#phone').val().trim();
        if (phoneVal === '') {
            isValid = false;
            $('#phone').addClass('input-error');
            $('#phone').next('.error-message').show();
        }

        if (isValid) {
            loader.css("display", "flex");
            $.ajax({
                method: "POST",
                url: " https://testologia.ru/checkout ",
                data: { name: $('#name').val(), phone: $('#phone').val() }
            })
                .done(function (msg) {
                    loader.hide();
                    if (msg.success) {
                        setTimeout(function () {
                            $('#name').val('');
                            $('#phone').val('');
                            $('.popup').css("display", "flex");
                        }, 500);

                    } else {
                        alert("Возникла ошибка, позвоните нам для оформления заявки.")
                    }
                });
        }

        $('.popup-content-close').on('click', function () {
            $('.popup').hide();
        })

        $('.popup-content-button').on('click', function () {
            window.location.href = '/';
        });
    });
});
