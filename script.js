
let replies = [];


function renderReplies(parentId, container) {
  container.innerHTML = '';

  replies
    .filter(reply => reply.parentId === parentId)
    .forEach(reply => {
      const replyDiv = document.createElement('div');
      replyDiv.classList.add('comment');
      
      replyDiv.innerHTML = `
        <div class="comment-header">
          <img src="https://cdn-icons-png.flaticon.com/512/149/149071.png" alt="User Image">
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

    
      renderReplies(reply.id, replyDiv.querySelector(`#replies-${reply.id}`));
    });
}

function showReplyInput(replyId) {
  document.getElementById(`reply-${replyId}`).style.display = 'block';
}


function addReply(parentId) {
  const replyName = document.getElementById(`reply-name-${parentId}`).value;
  const replyText = document.getElementById(`reply-input-${parentId}`).value;

  if (replyName && replyText) {
    replies.push({
      id: replies.length + 2, 
      name: replyName,
      text: replyText,
      parentId: parentId
    });
    document.getElementById(`reply-name-${parentId}`).value = ''; 
    document.getElementById(`reply-input-${parentId}`).value = ''; 
    renderReplies(1, document.getElementById('replies-1')); 
  } else {
    alert("Please enter both your name and a reply.");
  }
}


function editReply(replyId) {
  const reply = replies.find(r => r.id === replyId);
  const newText = prompt("Edit your reply:", reply.text);
  if (newText !== null && newText.trim() !== "") { 
    reply.text = newText;
    renderReplies(1, document.getElementById('replies-1')); 
  }
}


function deleteReply(replyId) {
  replies = replies.filter(reply => reply.id !== replyId && reply.parentId !== replyId);
  renderReplies(1, document.getElementById('replies-1'));
}


function resetComments() {
  replies = []; 
  renderReplies(1, document.getElementById('replies-1')); 

  document.querySelectorAll('.reply-section').forEach(replySection => {
    replySection.style.display = 'none';
  });
}

renderReplies(1, document.getElementById('replies-1'));
