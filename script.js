document.addEventListener('DOMContentLoaded', () => {
    const imageSelect = document.getElementById('image-select');
    const imgWidthInput = document.getElementById('img-width');
    const imgHeightInput = document.getElementById('img-height');
    const imgBorderInput = document.getElementById('img-border');
    const imgAltInput = document.getElementById('img-alt');
    const applyBtn = document.getElementById('apply-btn');

    const mainImage = document.getElementById('main-image');
    const infoText = document.getElementById('info-text');

    // Автоматична зміна картинки та оновлення alt-поля при виборі зі списку
    function changeImage() {
        mainImage.src = imageSelect.value;
        const selectedOption = imageSelect.options[imageSelect.selectedIndex];
        const defaultAlt = selectedOption.getAttribute('data-alt');
        
        imgAltInput.value = defaultAlt;
        mainImage.alt = defaultAlt;
        infoText.innerHTML = `Поточний alt: <i>${defaultAlt}</i>`;
    }

    // Застосування ручних налаштувань
    function applyStyles() {
        const width = imgWidthInput.value;
        const height = imgHeightInput.value;
        const border = imgBorderInput.value;
        const altText = imgAltInput.value;

        mainImage.style.width = width + 'px';
        mainImage.style.height = height + 'px';
        mainImage.style.borderWidth = border + 'px';
        mainImage.style.borderStyle = 'solid';
        mainImage.style.borderColor = '#007acc';

        mainImage.alt = altText;
        infoText.innerHTML = `Поточний alt: <i>${altText}</i>`;
    }

    imageSelect.addEventListener('change', changeImage);
    applyBtn.addEventListener('click', applyStyles);
});