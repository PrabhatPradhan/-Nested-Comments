// Array to hold comments and replies
let comments = [];

// Function to render comments and replies
function renderComments(parentId, container) {
  container.innerHTML = '';

  comments
    .filter(comment => comment.parentId === parentId)
    .forEach(comment => {
      const commentDiv = document.createElement('div');
      commentDiv.classList.add('comment');
      
      commentDiv.innerHTML = `
        <div class="comment-header">
          <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="User Image">
          <span class="name">${comment.name}</span>
        </div>
        <p>${comment.text}</p>
        <div class="comment-actions">
          <button onclick="showReplyInput(${comment.id})">Reply</button>
          <button onclick="editComment(${comment.id})">Edit</button>
          <button onclick="deleteComment(${comment.id})">Delete</button>
        </div>
        <div id="reply-${comment.id}" class="reply-section" style="display: none;">
          <input type="text" id="reply-name-${comment.id}" placeholder="Your name">
          <input type="text" id="reply-input-${comment.id}" placeholder="Add a reply">
          <button onclick="addReply(${comment.id})">Post Reply</button>
        </div>
        <div id="replies-${comment.id}" class="replies"></div>
      `;

      container.appendChild(commentDiv);

      // Recursive call to render replies
      renderComments(comment.id, commentDiv.querySelector(`#replies-${comment.id}`));
    });
}

// Function to add a new comment
function addComment() {
  const userName = document.getElementById('user-name').value;
  const newCommentText = document.getElementById('new-comment').value;

  if (userName && newCommentText) {
    comments.push({
      id: comments.length + 1,
      name: userName,
      text: newCommentText,
      parentId: null
    });
    document.getElementById('user-name').value = ''; // Clear name input
    document.getElementById('new-comment').value = ''; // Clear comment input
    renderComments(null, document.getElementById('comment-section')); // Re-render comments
  } else {
    alert("Please enter both your name and a comment.");
  }
}

// Function to show reply input
function showReplyInput(commentId) {
  document.getElementById(`reply-${commentId}`).style.display = 'block';
}

// Function to add a reply
function addReply(parentId) {
  const replyName = document.getElementById(`reply-name-${parentId}`).value;
  const replyText = document.getElementById(`reply-input-${parentId}`).value;

  if (replyName && replyText) {
    comments.push({
      id: comments.length + 1,
      name: replyName,
      text: replyText,
      parentId: parentId
    });
    document.getElementById(`reply-name-${parentId}`).value = ''; // Clear reply name input
    document.getElementById(`reply-input-${parentId}`).value = ''; // Clear reply input
    renderComments(null, document.getElementById('comment-section')); // Re-render comments
  } else {
    alert("Please enter both your name and a reply.");
  }
}

// Function to edit a comment or reply
function editComment(commentId) {
  const comment = comments.find(c => c.id === commentId);
  const newText = prompt("Edit your comment:", comment.text);
  if (newText !== null && newText.trim() !== "") { // Allow cancel but prevent empty comments
    comment.text = newText;
    renderComments(null, document.getElementById('comment-section')); // Re-render comments
  }
}

// Function to delete a comment and its replies
function deleteComment(commentId) {
  comments = comments.filter(comment => comment.id !== commentId && comment.parentId !== commentId);
  renderComments(null, document.getElementById('comment-section')); // Re-render comments
}

// Function to reset comments
function resetComments() {
  comments = [];
  renderComments(null, document.getElementById('comment-section')); // Re-render comments
}

// Initial render
renderComments(null, document.getElementById('comment-section'));
