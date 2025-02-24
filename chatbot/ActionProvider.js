export default class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
    }
  
    handleCourseQuery = () => {
      const message = this.createChatBotMessage(
        "We offer AI, Math, and Science courses. Would you like more details?"
      );
      this.setChatbotMessage(message);
    };
  
    defaultResponse = () => {
      const message = this.createChatBotMessage(
        "I'm not sure, but I'm learning every day! Can you ask something else?"
      );
      this.setChatbotMessage(message);
    };
  
    setChatbotMessage = (message) => {
      this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, message],
      }));
    };
  }
  