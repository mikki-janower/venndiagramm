$(document).ready(function () {
/*--------------update grid------------*/
$(function () {

  const $grid = $('.grid');
  if (!$grid.length) return;

  const $items = $('.grid-item');
  const $i2 = $('.grid-item--2');
  const $i3 = $('.grid-item--3');
  const $i4 = $('.grid-item--4');

  const gap = parseFloat(
    getComputedStyle(document.documentElement)
      .getPropertyValue('--gap')
  ) || 0;

  let lastCw = null;

  function getCols(w) {
    if (w <= 400) return 2;
    if (w <= 600) return 3;
    if (w <= 800) return 4;
    if (w <= 1000) return 5;
    return Math.floor(w / 200);
  }

  function updateGrid() {
    const gridWidth = $grid.innerWidth();
    const cols = getCols(gridWidth);

    const cw = (gridWidth - (cols - 1) * gap) / cols;

    // Skip only if cw is effectively unchanged
    if (lastCw !== null && Math.abs(cw - lastCw) < 0.5) return;
    lastCw = cw;

    // Explicit widths (Masonry-safe)
    $items.css('width', cw);
    $i2.css('width', 2 * cw + gap);
    $i3.css('width', 3 * cw + 2 * gap);
    $i4.css('width', 4 * cw + 3 * gap);

    // Update Masonry
    $grid.masonry('option', {
      columnWidth: cw,
      gutter: gap
    });

    $grid.masonry('layout');
  }

  // Init Masonry ONCE
  $grid.masonry({
    itemSelector: '.grid-item',
    columnWidth: 1,
    gutter: gap,
    percentPosition: false,
    transitionDuration: '0.05s'
  });

  updateGrid();

  // Resize handling
  let ticking = false;
  $(window).on('resize', function () {
    if (!ticking) {
      requestAnimationFrame(() => {
        updateGrid();
        ticking = false;
      });
      ticking = true;
    }
  });

});

//-----------------------------document closing bracket; don't touch
});