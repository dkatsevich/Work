function calc() {
    
    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function initCalc(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);

            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                elem.classList.add(activeClass);
            }

            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                elem.classList.add(activeClass);
            }

        })
    }

    initCalc('#gender div', 'calculating__choose-item_active');
    initCalc('.calculating__choose_big div', 'calculating__choose-item_active');



    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '____';
            return;
        }

        if (sex === 'male') {
            result.textContent = Math.round(88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age) * ratio);
        } else {
            result.textContent = Math.round(447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age) * ratio);
        }
    }

    calcTotal();

    function calcStaticInfo(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', ratio);
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', sex);
                }

                elements.forEach(i => {
                    i.classList.remove(activeClass);
                })

                e.target.classList.add(activeClass);
                calcTotal();
            })
        })
    }

    calcStaticInfo('#gender div', 'calculating__choose-item_active')
    calcStaticInfo('.calculating__choose_big div', 'calculating__choose-item_active')

    function calcDynamicInfo(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', (e) => {

            input.value = input.value.replace(/\D/g, '');

            switch (e.target.getAttribute('id')) {
                case 'height':
                    height = +e.target.value;
                    break;
                case 'weight':
                    weight = +e.target.value;
                    break;
                case 'age':
                    age = +e.target.value;
                    break;
            
            }

            calcTotal();
        })
    }

    calcDynamicInfo('#height');
    calcDynamicInfo('#weight');
    calcDynamicInfo('#age');
}

export default calc;