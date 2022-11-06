const MissionUtils = require("@woowacourse/mission-utils");
const validateInput = require("./ValidateInput");
const { getStrikeAndBall, getStrikeAndBallText } = require("./StrikeAndBall");
const getThreeRandomNumbers = require("./ThreeRandomNumbers");
const { NUMBER_LENGTH, END_INPUT, RESTART_INPUT } = require("./constants/ConstantValues");
const {
  START_MESSAGE,
  INPUT_NUMBER_MESSAGE,
  WRONG_INPUT_ERROR_MESSAGE,
  END_MESSAGE,
  INPUT_RESTART_OR_END_MESSAGE,
} = require("./constants/Messeages");

class App {
  constructor() {
    this.threeRandomNumbers = getThreeRandomNumbers();
    MissionUtils.Console.print(START_MESSAGE);
  }

  play() {
    MissionUtils.Console.readLine(INPUT_NUMBER_MESSAGE, (input) => {
      if (!validateInput(input)) {
        this.throwError();
      }

      const [strikeCount, ballCount] = getStrikeAndBall(this.threeRandomNumbers, input);
      const resultOutput = getStrikeAndBallText(strikeCount, ballCount);

      MissionUtils.Console.print(resultOutput);

      if (strikeCount === NUMBER_LENGTH) {
        this.end();
      }

      this.play();
    });
  }

  end() {
    MissionUtils.Console.print(END_MESSAGE);
    MissionUtils.Console.readLine(INPUT_RESTART_OR_END_MESSAGE, (input) => {
      if (input !== RESTART_INPUT && input !== END_INPUT) {
        this.throwError();
      }

      if (input === RESTART_INPUT) {
        this.threeRandomNumbers = getThreeRandomNumbers();
        this.play();
      }
      if (input === END_INPUT) {
        MissionUtils.Console.close();
      }
    });
  }
  throwError() {
    MissionUtils.Console.close();
    throw new Error(WRONG_INPUT_ERROR_MESSAGE);
  }
}

// const app = new App();
// app.play();

module.exports = App;
