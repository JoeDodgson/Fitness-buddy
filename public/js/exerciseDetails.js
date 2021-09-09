// Event listener for adding / removing a specific exercise from favourites
const star = $('h3>.fa-star');
const tooltipText = $('.tooltip-text');
const exerciseChangeMsg = $('.exercise-change');

star.on('click', async event => {
  event.preventDefault();
  const id = $(event.target)
    .parent()
    .attr('data-id');

  // When user clicks the star, add or remove exercise from favourites
  try {
    // If the star was filled ('fa' class), then delete exercise from user's favourites
    if ($(event.target).hasClass('fa')) {
      await $.ajax({ url: `/api/fave-exercise/${id}`, type: 'DELETE' });
      // Change star styling from filled to unfilled
      $(event.target)
        .removeClass('fa')
        .addClass('far');
      // Update tooltip text
      tooltipText
        .text('Add to favourites');
      // Update and display exercise change confirmation
      exerciseChangeMsg
        .text('Exercise removed from favourites')
        .css('visibility', 'visible');
      // If the star was unfilled ('far' class), then add exercise to user's favourites
    } else {
      await $.post(`/api/fave-exercise/${id}`);
      // Change star styling from unfilled to filled
      $(event.target)
        .removeClass('far')
        .addClass('fa');
      // Update tooltip text
      tooltipText
        .text('Remove from favourites');
      // Update and display exercise change confirmation
      exerciseChangeMsg
        .text('Exercise added to favourites')
        .css('visibility', 'visible');
    }
  } catch (err) {
    console.error(`ERROR - results.js - star.on('click'): ${err}`);
  }
});
