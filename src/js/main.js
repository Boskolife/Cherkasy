document.addEventListener('DOMContentLoaded', function () {
  const pages = document.querySelectorAll('.page > div');
  const pagination = document.createElement('div');
  pagination.classList.add('pagination');
  document.querySelector('.page').after(pagination);

  let currentPage = 1;
  const totalPages = pages.length;

  function renderPages() {
    pages.forEach((page, index) => {
      if (index + 1 === currentPage) {
        page.classList.add('active-page');
      } else {
        page.classList.remove('active-page');
      }
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderPagination() {
    pagination.innerHTML = '';

    const createPageButton = (pageNum, text = pageNum) => {
      const btn = document.createElement('button');
      btn.textContent = text;
      btn.classList.add('page-btn');
      if (pageNum === currentPage) btn.classList.add('active');
      btn.addEventListener('click', () => {
        currentPage = pageNum;
        renderPages();
        renderPagination();
      });
      return btn;
    };

    const createArrowButton = (direction) => {
      const btn = document.createElement('button');
      const img = document.createElement('img');
      img.src =
        direction === 'prev' ? '/img/prev_arrow.svg' : '/img/next_arrow.svg';
      img.alt = direction === 'prev' ? 'Previous' : 'Next';
      img.classList.add('arrow-icon');
      btn.appendChild(img);
      btn.classList.add('arrow-btn', direction);
      btn.disabled =
        (direction === 'prev' && currentPage === 1) ||
        (direction === 'next' && currentPage === totalPages);
      btn.addEventListener('click', () => {
        if (direction === 'prev' && currentPage > 1) currentPage--;
        if (direction === 'next' && currentPage < totalPages) currentPage++;
        renderPages();
        renderPagination();
      });
      return btn;
    };

    pagination.appendChild(createArrowButton('prev'));

    pagination.appendChild(createPageButton(1));

    if (currentPage > 3) {
      const dots = document.createElement('span');
      dots.textContent = '...';
      pagination.appendChild(dots);
    }

    let start = Math.max(2, currentPage - 1);
    let end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pagination.appendChild(createPageButton(i));
    }

    if (currentPage < totalPages - 2) {
      const dots = document.createElement('span');
      dots.textContent = '...';
      pagination.appendChild(dots);
    }

    pagination.appendChild(createPageButton(totalPages));

    pagination.appendChild(createArrowButton('next'));
  }

  renderPages();
  renderPagination();
});
