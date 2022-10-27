const cols = document.querySelectorAll('.col');

/*function genRandomColor() {
    return '#' + Math.floor( Math.random() * 0xFFFFFF + 1).toString(16)
}*/

document.addEventListener('keydown', e => {
    e.preventDefault();
    if (e.code.toLowerCase() === 'space') {
        setRandomColors();
    }
})

document.addEventListener('click', e => {
    const type = e.target.dataset.type;
    if (type === 'lock') {
        const node = e.target.tagName.toLowerCase() === 'i'
            ? e.target
            : e.target.children[0];
        node.classList.toggle('fa-unlock');
        node.classList.toggle('fa-lock');
    }
    if (type === 'color') {
        copyClickboard(e.target.textContent);
    }
});

function setRandomColors(init) {
    const colors = init ? getColorsHash() : [];
    cols.forEach((col, i) => {
        const text = col.querySelector('h2');
        const btn = col.querySelector('button');
        const isLocked = btn.querySelector('i').classList.contains('fa-lock');
        if (isLocked) {
            colors.push(text.textContent);
            return;
        }
        const color = init
            ? colors[i]
                ? colors[i]
                : chroma.random()
            : chroma.random()

        if(!init || colors.length !== cols.length) {
            colors.push(color);
        }

        setTextColor(text, color);
        setTextColor(btn, color);
        text.textContent = color;
        col.style.background = color;
    });

    updateColorsHash(colors);
}

function setTextColor(text, color) {
    const luminance = chroma(color).luminance();
    text.style.color = luminance > 0.5 ? 'black' : 'white';

}

function copyClickboard(text) {
    return navigator.clipboard.writeText(text);
}

function updateColorsHash(colors = []) {
    document.location.hash = colors.join('-').replaceAll("#", '');
}

function getColorsHash() {
    console.log(document.location.hash.length);
    if (document.location.hash.length > 1) {
        return document.location.hash.substring(1).split('-').map(c => '#' + c);
    }
    return [];
}

setRandomColors(true);