const MissionUtils = require("@woowacourse/mission-utils");
const BridgeGame = require("./BridgeGame");
const BridgeMaker = require("./BridgeMaker");
const BridgeRandomNumberGenerator = require("./BridgeRandomNumberGenerator");
const OutputView = require("./OutputView");
/**
 * 사용자로부터 입력을 받는 역할을 한다.
 */
const InputView = {
  /**
   * 다리의 길이를 입력받는다.
   */
  readBridgeSize() {
    MissionUtils.Console.readLine("다리의 길이를 입력해주세요.\n", (input) => {
      MissionUtils.Console.print('');
      const bridgeGame = new BridgeGame(BridgeMaker.makeBridge(input, BridgeRandomNumberGenerator.generate));
      this.readMoving(bridgeGame);
    });
  },

  /**
   * 사용자가 이동할 칸을 입력받는다.
   */
  readMoving(bridgeGame) {
    MissionUtils.Console.readLine("이동할 칸을 선택해주세요. (위: U, 아래: D)\n", (input) => {
      const roundResult = bridgeGame.move(input);
      OutputView.printMap(bridgeGame.stateToString());
      if(!roundResult) {
        this.readGameCommand(bridgeGame);
      } else if (bridgeGame.isArrived()){
        OutputView.printResult(bridgeGame.stateToString(), bridgeGame.isArrived(), bridgeGame.getTry());
        return null;
      } 
      this.readMoving(bridgeGame);
    });
  },

  /**
   * 사용자가 게임을 다시 시도할지 종료할지 여부를 입력받는다.
   */
  readGameCommand(bridgeGame) {
    MissionUtils.Console.readLine("게임을 다시 시도할지 여부를 입력해주세요. (재시도: R, 종료: Q)\n", (input) => {
      if(input == 'R') {
        bridgeGame.retry();
        this.readMoving(bridgeGame);
      } else if(input == 'Q') {
        OutputView.printResult(bridgeGame.stateToString(), bridgeGame.isArrived(), bridgeGame.getTry());
        return null;
      } else {
        throw new Error("[ERROR] R 혹은 Q를 입력해야 합니다.");
      }
    });
  },
};

module.exports = InputView;
