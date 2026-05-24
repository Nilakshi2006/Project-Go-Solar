// Get references to the button and the info section
const toggleBtn = document.getElementById('toggleBtn');
const extraInfo = document.getElementById('extraInfo');

// Listen for clicks on the button
toggleBtn.addEventListener('click', () => {
  // Toggle visibility
  if (extraInfo.style.display === 'block') {
    extraInfo.style.display = 'none';
    toggleBtn.textContent = 'Learn More';
  } else {
    extraInfo.style.display = 'block';
    toggleBtn.textContent = 'Show Less';
  }
});
