const list = document.querySelector('.chat-list');
const addForm = document.querySelector('.chat-form');
const nameForm = document.querySelector('.nameform');
const updateMsg = document.querySelector('.update-message');
const updateRooms = document.querySelector('.buttons');

nameForm.addEventListener('submit',e=>{
    e.preventDefault();
    const newname = nameForm.username.value.trim();
    newchat.updateName(newname);
    nameForm.reset();
    updateMsg.textContent = `Your name has been updated to ${newname} !`;
    setTimeout(()=>updateMsg.textContent='',3000);

})
updateRooms.addEventListener('click',e=>{
    if(e.target.tagName==='BUTTON'){
        const newroom = e.target.getAttribute('id');
        newchat.updateRoom(newroom);
        appui.clear();
        newchat.getChats((data)=>appui.render(data));
    }
})
const username = localStorage.username ? localStorage.username : 'anon';
const newchat = new ChatRoom('general',username);
const appui = new ChatUI(list);

addForm.addEventListener('submit',e=>{
    e.preventDefault();
    const text = addForm.message.value.trim();
    newchat.addChat(text);
    addForm.reset();
})
newchat.getChats((data)=>{
    appui.render(data);
});