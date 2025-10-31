import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./authContext";
import toast from "react-hot-toast"
export const ChatContext = createContext();

export const ChatProvider = ({children})=>{

    const [messages , setMessages] = useState([])
    const [users , setUsers] = useState([])
    const [selectedUser , setSelectedUser] = useState(null)
    const [unseenMessages , setUnseenMessages] = useState({})

    const {socket , axios} = useContext(AuthContext);
 
    // FUNCTION TO GET ALL USERS FOR SIDEBAR
    const getUsers = async() =>{
        try{
           const {data} = await axios.get("http://localhost:5001/api/messages/users");
           if(data.success){
            setUsers(data.users);
            setUnseenMessages(data.unseenMessages);

           }
 
        }catch(error){
            toast.error(error.message)
        }
    }

    // FUNCTION TO GET MESSAGES FOR SELECTED USER
    const getMessages = async(userId)=>{
        try{
            const {data} = await axios.get(`http://localhost:5001/api/messages/${userId}`);
            if(data.success){
             setMessages(data.messages);
            }
            }catch(error){
                toast.error(error.message)
            }
        }

    // FUNCTION TO SEND MESSAGE TO SELECTED USER
    const sendMessage = async(messageData)=>{
        try{
            const {data} = await axios.post(`http://localhost:5001/api/messages/send/${selectedUser._id}`, messageData);
            if(data.success){
                setMessages((prevMessages)=>[...prevMessages , data.newMessage])

            }else{
                toast.error(data.message)
            }
        }catch(error){
            toast.error(error.message)
        }

    }


  // FUNCTION TO SUBSCRIBE TO MESSAGE FOR SELECTED USER
  const subscribeToMessages = async() =>{
    if(!socket) return;
    socket.on("newMessage",(newMessage)=>{
        if(selectedUser && newMessage.senderId === selectedUser._id){
            newMessage.seen = true ;
            setMessages((prevMessages)=> [...prevMessages , newMessage]);
            axios.put(`http://localhost:5001/api/messages/mark/${newMessage._id}`);
        }else{
            setUnseenMessages((prevUnseenMessages)=>({
               ...prevUnseenMessages , [newMessage.senderId]:
               prevUnseenMessages[newMessage.senderId] ? prevUnseenMessages[newMessage.senderId] + 1 : 1
            }))
        } 

    })
  }

//  FUNCTION TO UNSUBSCRIBE FROM MESSAGES 
const unsubscribeFromMessages = async()=>{
        if(socket) socket.off("newMessage") 
}

   useEffect(()=>{
     subscribeToMessages();
     return ()=> unsubscribeFromMessages();
   },[socket , selectedUser])

    const value = {
        messages , users , selectedUser , getUsers , 
        getMessages,sendMessage , setSelectedUser ,
         unseenMessages , setUnseenMessages

    }
    return(
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    )
}