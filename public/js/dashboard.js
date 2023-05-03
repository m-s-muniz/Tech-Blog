const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#blog-name').value.trim();
  const comment = document.querySelector('#blog-comment').value.trim();

  if (name && comment) {
    const response = await fetch(`/api/blogs`, {
      method: 'POST',
      body: JSON.stringify({ name, comment }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to create blog');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id') && event.target.getAttribute('data-action') === 'delete') {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/blogs/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete blog');
    }
  }
};

// Update still in progress.  Doesnt work
const updButtonHandler = async (event) => {
  if (event.target.getAttribute('data-action') === 'update') {
    const id = event.target.getAttribute('data-id');
    const name = document.querySelector(`#blog-name-${id}`).value.trim();
    const comment = document.querySelector(`#blog-comment-${id}`).value.trim();

    if (name && comment) {
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ name, comment }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to update blog');
      }
    }
  }
};


document
  .querySelector('.new-blog-form')
  .addEventListener('submit', newFormHandler);
  
document
    .querySelector('.blog-list')
    .addEventListener('click', updButtonHandler);
document 
  .querySelector('.blog-list')
  .addEventListener('click', delButtonHandler);

