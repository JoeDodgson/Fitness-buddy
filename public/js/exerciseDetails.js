// Event listener for adding / removing a specific exercise from favourites
const favouriteBtn = $('.favourites-button');

favouriteBtn.on('click', async event => {
  event.preventDefault();
  const id = $(event.target).attr('data-id');

  // When user clicks either the Add to favourites or Remove from favourites button (they both have .favourites-button class)
  // then a request is sent to the API and both buttons are toggled between hidden and visible
  try {
    if ($(event.target).attr('id') === 'remove-from-favourites') {
      await $.ajax({ url: `/api/fave-exercise/${id}`, type: 'DELETE' });
      // Display message telling user their exercise was removed
    } else {
      await $.post(`/api/fave-exercise/${id}`);
      // Display message telling user their exercise was added
    }
    favouriteBtn.toggle();
  } catch (err) {
    console.error(`ERROR - results.js - favouriteBtn.on('click'): ${err}`);
  }
});
