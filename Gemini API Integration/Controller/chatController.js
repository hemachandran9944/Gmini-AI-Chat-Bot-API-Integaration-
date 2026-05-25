const {GoogleGenerativeAI} = require('@google/generative-ai');
const Chat = require('../Modules/Chat');

const GenAI = new GoogleGenerativeAI(process.env.GiminiAPIkey);


// Chat Creat 
exports.ChatWithGenAI = async(req, res)=>{
    try {
        const { userId, title } = req.body;
        const chatCreate = await Chat.create({
            userId,
            title: title ? title.trim() : 'New Conversation',
            messages: []
        });
        res.status(201).json({status: 'Success', message: 'Chat create successfulley!', data: chatCreate});
    } catch (error) {
        res.status(500).json({status: 'Failed',  message: 'Chat created successfully', error: error.message});
    }
};


//ChatSend
exports.SendMessage = async (req, res) => {
    try {
        const {id} = req.params;
        const {message} = req.body;

        if(!message) {
            return res.status(400).json({status: 'Failed', message: 'Message is required'});
        }
        
        if(!id) {
            return res.status(400).json({status: 'Failed', message: 'Chat ID is required'});
        }

        const Userchat = await Chat.findById(id);
        if (!Userchat) {
            return res.status(404).json({
                status: 'Failed',
                message: 'Chat not found'
            });
        }

        const history = Userchat.messages.map((msg) => ({
            role: msg.role,
            parts: msg.parts.map((part) => ({ text: part.text }))
        }));

        // GeminiAI Config 
        const model = GenAI.getGenerativeModel({ model: Userchat.modelName || 'gemini-2.5-flash' });
        const geminiChat = await model.startChat({history});
        const result = await geminiChat.sendMessage(message);
        const replyText = result.response.text();

        Userchat.messages.push({role: 'user',  parts: [{text: message}]});
        Userchat.messages.push({role: 'model', parts: [{text: replyText}]});

        Userchat.messageCount = Userchat.messages.length
        Userchat.lastMessageAt = new Date();
        await Userchat.save();

        return res.status(200).json({
            status: "Success",
            message: 'Message send successfulley!',
            data: {
                UserMessage: message,
                GminiReply: replyText
            }
        });

    } catch (error) {
        return res.status(500).json({status: 'failed', error: error.message});
    }
};



// Delete ALl User
    
exports.DeleteAllChat = async (req, res) => {
    try {
        const deleteAllAIchar = await Chat.deleteMany({})
        return res.status(200).json({
            status: 'Success',
            count: deleteAllAIchar.deletedCount
        });
    } catch (error) {
        res.status(500).json({status: 'failed', error: error.message})
    }
};