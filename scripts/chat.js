class ChatRoom {
    constructor(room,username){
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
        this.unsub;
    }
    async addChat(message) {
        const now = new Date();
        const chat = {
            message : message,
            room : this.room,
            username : this.username,
            created_at : firebase.firestore.Timestamp.fromDate(now)
        }
        db.collection('chats').add(chat)
         .then(()=>{
             console.log('chat added successfully');
         })
          .catch((err)=>{
              console.log(err);
          })
    }
    getChats(callback){
        this.unsub = this.chats
                        .where('room','==',this.room)
                        .orderBy('created_at')
                        .onSnapshot(snapshot=>{
                            snapshot.docChanges().forEach(change=>{
                                const doc = change.doc;
                                if(change.type==='added'){
                                    callback(doc.data());
                                }
                            })
                        })
                         
    }
    updateName(username){
        this.username = username;
        localStorage.setItem('username',username);
    }
    updateRoom(room){
        this.room = room;
        if(this.unsub)
            this.unsub();
    }
}


