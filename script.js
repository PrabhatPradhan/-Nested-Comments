// Array to hold replies (all replies will be nested under one main comment with id 1)
let replies = [];

// Function to render replies recursively
function renderReplies(parentId, container) {
  container.innerHTML = '';

  replies
    .filter(reply => reply.parentId === parentId)
    .forEach(reply => {
      const replyDiv = document.createElement('div');
      replyDiv.classList.add('comment');
      
      replyDiv.innerHTML = `
        <div class="comment-header">
          <img src="https://via.placeholder.com/30" alt="User Image">
          <span class="name">${reply.name}</span>
        </div>
        <p>${reply.text}</p>
        <div class="comment-actions">
          <button onclick="showReplyInput(${reply.id})">Reply</button>
          <button onclick="editReply(${reply.id})">Edit</button>
          <button onclick="deleteReply(${reply.id})">Delete</button>
        </div>
        <div id="reply-${reply.id}" class="reply-section" style="display: none;">
          <input type="text" id="reply-name-${reply.id}" placeholder="Your name">
          <input type="text" id="reply-input-${reply.id}" placeholder="Add a reply">
          <button onclick="addReply(${reply.id})">Post Reply</button>
        </div>
        <div id="replies-${reply.id}" class="replies"></div>
      `;

      container.appendChild(replyDiv);

      // Recursive call to render nested replies
      renderReplies(reply.id, replyDiv.querySelector(`#replies-${reply.id}`));
    });
}

// Function to show reply input box
function showReplyInput(replyId) {
  document.getElementById(`reply-${replyId}`).style.display = 'block';
}

// Function to add a reply
function addReply(parentId) {
  const replyName = document.getElementById(`reply-name-${parentId}`).value;
  const replyText = document.getElementById(`reply-input-${parentId}`).value;

  if (replyName && replyText) {
    replies.push({
      id: replies.length + 2, // Start from 2 to avoid conflict with initial comment id 1
      name: replyName,
      text: replyText,
      parentId: parentId
    });
    document.getElementById(`reply-name-${parentId}`).value = ''; // Clear reply name input
    document.getElementById(`reply-input-${parentId}`).value = ''; // Clear reply input
    renderReplies(1, document.getElementById('replies-1')); // Re-render replies under the main comment
  } else {
    alert("Please enter both your name and a reply.");
  }
}

// Function to edit a reply
function editReply(replyId) {
  const reply = replies.find(r => r.id === replyId);
  const newText = prompt("Edit your reply:", reply.text);
  if (newText !== null && newText.trim() !== "") { // Allow cancel but prevent empty replies
    reply.text = newText;
    renderReplies(1, document.getElementById('replies-1')); // Re-render replies
  }
}

// Function to delete a reply and its nested replies
function deleteReply(replyId) {
  replies = replies.filter(reply => reply.id !== replyId && reply.parentId !== replyId);
  renderReplies(1, document.getElementById('replies-1')); // Re-render replies
}

// Function to reset all replies
function resetComments() {
  replies = []; // Clear the replies array
  renderReplies(1, document.getElementById('replies-1')); // Clear the rendered replies
  // Hide all reply input sections
  document.querySelectorAll('.reply-section').forEach(replySection => {
    replySection.style.display = 'none';
  });
}

// Initial render for the main comment's replies
renderReplies(1, document.getElementById('replies-1'));
