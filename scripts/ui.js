class ChatUI{
    constructor(list){
        this.list = list;
    }
    clear(){
        this.list.innerHTML = '';
    }
    render(data){
        const when = dateFns.distanceInWordsToNow(
            data.created_at.toDate(),
            {addSuffix : true}
        );
        const html = `
         <li class="list-element">
            <span class="username"><strong>${data.username}</strong></span>
            <span class="message">${data.message}</span>
            <div class="time">${when}</div>
         </li>
        `;

        this.list.innerHTML += html;
    }
}