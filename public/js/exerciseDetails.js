// Event listener for adding / removing a specific exercise from favourites
const star = $('h3>.fa-star');

star.on('click', async event => {
  event.preventDefault();
  const id = $(event.target)
    .parent()
    .attr('data-id');

  // When user clicks the star, add or remove exercise from favourites
  try {
    // If the star was filled ('fa' class), then delete it from the user's favourite exercises
    if ($(event.target).attr('class') === 'fa fa-star large-star') {
      await $.ajax({ url: `/api/fave-exercise/${id}`, type: 'DELETE' });
      // Change star styling from filled to unfilled
      $(event.target).attr('class', 'far fa-star large-star');

    // If the star was unfilled ('far' class), then add it to the user's favourite exercises
    } else {
      await $.post(`/api/fave-exercise/${id}`);
      // Change star styling from unfilled to filled
      $(event.target).attr('class', 'fa fa-star large-star');
    }
  } catch (err) {
    console.error(`ERROR - results.js - star.on('click'): ${err}`);
  }
});
