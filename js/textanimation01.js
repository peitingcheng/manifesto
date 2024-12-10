const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const coolSpans = entry.target.querySelectorAll('.cool span');
            coolSpans.forEach(span => {
                span.classList.remove('animate');
                void span.offsetWidth;
                span.classList.add('animate');
            });
        }
    });
}, {
    threshold: 0.5
});

const page01 = document.querySelector('#page-01');
if (page01) {
    observer.observe(page01);
}

const page02 = document.querySelector('#page-02');
if (page02) {
    observer.observe(page02);
}

const page03 = document.querySelector('#page-03');
if (page03) {
    observer.observe(page03);
}

const page04 = document.querySelector('#page-04');
if (page04) {
    observer.observe(page04);
}

const page05 = document.querySelector('#page-05');
if (page05) {
    observer.observe(page05);
}

const page06 = document.querySelector('#page-06');
if (page06) {
    observer.observe(page06);
}

const page07 = document.querySelector('#page-07');
if (page07) {
    observer.observe(page07);
}

const page08 = document.querySelector('#page-08');
if (page08) {
    observer.observe(page08);
}
