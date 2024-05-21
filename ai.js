require("dotenv").config({ path: "./.env" });
const Groq = require("groq-sdk");

/**
 * @typedef {Object} chat
 * @property {string} role
 * @property {string} content
 */

class AI {
  #messages = [];
  #groq;
  constructor() {
    this.#groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
  }
  /**
   *
   * @param {chat} message
   * @returns {boolean}
   */
  addmessage(message) {
    if (message) {
      this.#messages.push(message);
      return true;
    } else return false;
  }

  async response() {
    const chatCompletion = await this.#groq.chat.completions.create({
      messages: this.#messages,
      model: "llama3-8b-8192",
      temperature: 1,
      max_tokens: 1024,
      top_p: 1,
      stream: true,
      stop: null,
    });
    let ans = "";
    for await (const chunk of chatCompletion) {
      process.stdout.write(chunk.choices[0]?.delta?.content || "");
      ans += chunk.choices[0]?.delta?.content || "";
    }
    this.#messages.push({ role: "assistant", content: ans });
  }
}

module.exports = { AI };
