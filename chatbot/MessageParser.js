export default class MessageParser {
    constructor(actionProvider) {
      this.actionProvider = actionProvider;
    }
  
    parse(message) {
      const lowerCaseMessage = message.toLowerCase();
  
      if (lowerCaseMessage.includes("course")) {
        this.actionProvider.handleCourseQuery();
      } else {
        this.actionProvider.defaultResponse();
      }
    }
  }
  