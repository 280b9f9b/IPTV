const channelContainer = document.getElementById('channel-container');
const searchInput = document.getElementById('search-input');

let channels = [];

// Fetch channels from JSON file
fetch('data/ch.json')
  .then(response => response.json())
  .then(data => {
    channels = data;
    renderChannels(channels);
  })
  .catch(error => console.error('Error fetching channels:', error));

// Render channels based on current state
const renderChannels = (channels) => {
  channelContainer.innerHTML = '';

  channels.forEach((channel) => {
    const card = document.createElement('div');
    card.classList.add('channel-card');

    const link = document.createElement('a');
    link.href = channel.link;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';

    const image = document.createElement('img');
    image.src = channel.image;

    link.appendChild(image);
    card.appendChild(link);

    const title = document.createElement('h2');
    title.textContent = channel.name;
    card.appendChild(title);

    const categories = document.createElement('p');
    categories.textContent = `${channel.cat01} | ${channel.cat02}`;
    card.appendChild(categories);

    channelContainer.appendChild(card);

    image.addEventListener('click', () => {
      window.location.href = channel.link;
    });
  });
};

// Filter channels based on search keyword
const filterChannelsBySearch = (keyword) => {
  const filteredChannels = channels.filter((channel) => {
    const channelName = channel.name.toLowerCase();
    const channelCategory1 = channel.cat01.toLowerCase();
    const channelCategory2 = channel.cat02.toLowerCase();
    const searchKeyword = keyword.toLowerCase();
    return channelName.includes(searchKeyword) || channelCategory1.includes(searchKeyword) || channelCategory2.includes(searchKeyword);
  });
  renderChannels(filteredChannels);
};

// Handle search input events
searchInput.addEventListener('input', (event) => {
  const keyword = event.target.value;
  filterChannelsBySearch(keyword);
});
