function slider() {
    
    let index = 1;
    const slides = document.querySelectorAll('.offer__slide');
    const prevBtn = document.querySelector('.offer__slider-prev');
    const nextBtn = document.querySelector('.offer__slider-next');
    const currentSlide = document.getElementById('current');
    const totalSlides = document.getElementById('total');



    const length = slides.length;

    if (length >= 10) {
        totalSlides.innerHTML = length;  
    } else {
        totalSlides.innerHTML = `0${length}`;  
    }
        
    currentSlide.innerHTML = `0${index}`;  

    function showSlide(n) {
        if (n > slides.length) {
            index = 1;
        }
        if (n < 1) {
            index = slides.length;
        }

        if (index >= 10) {
            currentSlide.innerHTML = index;  
        } else {
            currentSlide.innerHTML = `0${index}`;  
        }

        slides.forEach(slide => slide.style.display = 'none');
        slides[index - 1].style.display = 'block';
    }

    showSlide(index);

    function plusSlide(n) {
        showSlide(index += n);      
    }

    prevBtn.addEventListener('click', () => {
        plusSlide(-1);
    })
    nextBtn.addEventListener('click', () => {
        plusSlide(1);
    })

}

export default slider;