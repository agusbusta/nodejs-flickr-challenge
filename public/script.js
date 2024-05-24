document.addEventListener('DOMContentLoaded', function () {
    let currentPage = 1;

    function loadPhotos(page = 1) {
        fetch(`/photos?page=${page}`)
            .then(response => response.json())
            .then(photos => {
                const photosDiv = document.getElementById('photos');
                photosDiv.innerHTML = '';
                photos.forEach(photo => {
                    const photoDiv = document.createElement('div');
                    photoDiv.classList.add('photo');
                    photoDiv.innerHTML = `
                        <img src="${photo.image_url}" alt="Cat Photo">
                        <p>Published: ${new Date(photo.published_date).toLocaleString()}</p>
                        <button onclick="deletePhoto(${photo.id})">Delete</button>
                    `;
                    photosDiv.appendChild(photoDiv);
                });
            })
            .catch(error => console.error('Error loading photos:', error));
    }

    function loadTags() {
        fetch('/tags')
            .then(response => response.json())
            .then(tags => {
                const tagsDiv = document.getElementById('tags');
                tagsDiv.innerHTML = '';
                tags.forEach(tag => {
                    const tagButton = document.createElement('button');
                    tagButton.textContent = tag.tags;
                    tagButton.onclick = () => loadPhotosByTag(tag.tags);
                    tagsDiv.appendChild(tagButton);
                });
            })
            .catch(error => console.error('Error loading tags:', error));
    }

    function loadPhotosByTag(tag, page = 1) {
        fetch(`/tags/${tag}?page=${page}`)
            .then(response => response.json())
            .then(photos => {
                const photosDiv = document.getElementById('photos');
                photosDiv.innerHTML = '';
                photos.forEach(photo => {
                    const photoDiv = document.createElement('div');
                    photoDiv.classList.add('photo');
                    photoDiv.innerHTML = `
                        <img src="${photo.image_url}" alt="Cat Photo">
                        <p>Published: ${new Date(photo.published_date).toLocaleString()}</p>
                        <button onclick="deletePhoto(${photo.id})">Delete</button>
                    `;
                    photosDiv.appendChild(photoDiv);
                });
            })
            .catch(error => console.error('Error loading photos by tag:', error));
    }

    function deletePhoto(id) {
        fetch(`/photos/${id}`, {
            method: 'DELETE'
        })
            .then(() => loadPhotos(currentPage))
            .catch(error => console.error('Error deleting photo:', error));
    }

    document.getElementById('pagination').innerHTML = `
        <button onclick="loadPhotos(--currentPage)">Previous</button>
        <button onclick="loadPhotos(++currentPage)">Next</button>
    `;

    loadTags();
    loadPhotos();
});
