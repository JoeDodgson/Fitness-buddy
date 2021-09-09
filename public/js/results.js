// Event listener to add or remove an exercise from favourites
const star = $('h3>.fa-star');

star.on('click', async event => {
  event.preventDefault();
  const id = $(event.target)
    .parent()
    .attr('data-id');
  const tooltipText = $(event.target).children('span.tooltip-text');
  try {
    if ($(event.target).hasClass('fa')) {
      await $.ajax({ url: `/api/fave-exercise/${id}`, type: 'DELETE' });
      // Change star styling from filled to unfilled
      $(event.target).removeClass('fa');
      $(event.target).addClass('far');
      // Change tooltip text
      tooltipText.text('Add to favourites');
      // If the star was unfilled ('far' class), then add it to the user's favourite exercises
    } else {
      await $.post(`/api/fave-exercise/${id}`);
      // Change star styling from unfilled to filled
      $(event.target).removeClass('far');
      $(event.target).addClass('fa');
      // Change tooltip text
      tooltipText.text('Remove from favourites');
    }
  } catch (err) {
    console.error(`ERROR - results.js - star.on('click'): ${err}`);
  }
});
