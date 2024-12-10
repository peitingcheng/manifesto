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