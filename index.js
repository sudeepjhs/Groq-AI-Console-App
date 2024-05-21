const { AI } = require("./ai");
const inquirer = import("inquirer");

const ai = new AI();

/**
 * @typedef {Object} chat
 * @property {string} role
 * @property {string} content
 */

/**
 *
 * @param {AI} ai
 * @returns
 */
async function main() {
  const response = await (
    await inquirer
  ).default.prompt({
    type: "input",
    name: "ai_question",
    message: "Ask a question or (type 'exit' to exit)",
  });
  switch (response.ai_question) {
    case "exit":
      return process.exit;
    default:
      if (ai.addmessage({ role: "user", content: response.ai_question }))
        await ai.response();
      else throw new Error("unable to send message");
  }
  console.log("\n");
  main();
}

main();
