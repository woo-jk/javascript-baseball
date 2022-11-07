const App = require("../src/App");
const validateInput = require("../src/ValidateInput");
const MissionUtils = require("@woowacourse/mission-utils");

const mockQuestion = (answer) => {
  MissionUtils.Console.readLine = jest.fn();
  MissionUtils.Console.readLine.mockImplementationOnce((question, callback) => {
    callback(answer);
  });
};

afterEach(() => {
  MissionUtils.Console.close();
});

describe("플레이어 입력 검증 테스트", () => {
  test("입력 검증 함수 정상 입력", () => {
    const inputs = ["123", "231", "451", "643"];

    inputs.forEach((input) => {
      const result = validateInput(input);
      expect(result).toBeTruthy();
    });
  });

  test("입력 검증 함수 잘못된 입력", () => {
    const inputs = [
      ["123", true],
      ["445", false],
      ["4513", false],
      ["643", true],
      ["de2", false],
    ];

    inputs.forEach(([input, answer]) => {
      const result = validateInput(input);
      expect(result).toEqual(answer);
    });
  });

  test("잘못된 입력시 throw 예외 처리", () => {
    const answers = "1234";

    mockQuestion(answers);

    expect(() => {
      const app = new App();
      app.play();
    }).toThrow();
  });
});
